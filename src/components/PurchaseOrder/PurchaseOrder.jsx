import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ContentMenu, WrapperContent, WrapperFlex } from './style';
import { Badge, ConfigProvider } from 'antd';
import DetailOrderComponent from '../DetailOrderComponent/DetailOrderComponent';
import { useQuery } from '@tanstack/react-query';
import * as OrderService from '../../services/OrderService'
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


const PurchaseOrder = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const user = useSelector((state) => state.user)
    const location = useLocation();

    // Các mục menu
    const items = [
        { key: 'sub1', label: 'Chờ xác nhận', type: '1' },
        { key: 'sub2', label: 'Chờ lấy hàng', type: '2' },
        { key: 'sub3', label: 'Chờ giao hàng', type: '3' },
        { key: 'sub4', label: 'Đã giao', type: '4' },
        { key: 'sub5', label: 'Đã hủy', type: '5' },
    ];

    // danh sách đơn đặt hàng
    const fetchAllOrder = async () => {
        const res = await OrderService.getUserOrder(user?.id);
        return res.data;
    };

    const { data: userOrders } = useQuery({ queryKey: ['userOrders'], queryFn: fetchAllOrder, enabled: !!user?.id });

    // console.log(userOrders)

    // Mapping type từ URL với status của đơn hàng
    const statusMap = {
        1: 'Pending',   // Đơn hàng đã được đặt nhưng chưa được xử lý hoặc xác nhận.
        2: 'Processing', // Đơn hàng đang được đóng gói, chuẩn bị để giao cho bên vận chuyển.
        3: 'Shipped',    // Đơn hàng đã được giao cho bên vận chuyển và đang trên đường đến tay khách hàng.
        4: 'Delivered',  // Đơn hàng đã được giao đến khách hàng.
        5: 'Cancelled'   // Đơn hàng đã bị hủy bởi người mua hoặc người bán trước khi giao hàng.
    };

    // Tính toán số lượng đơn hàng theo trạng thái
    const orderCounts = (type) => {
        const status = statusMap[type] || 'Pending';
        return userOrders?.filter(order => order.status === status).length || 0;
    };

    // Hàm để lấy danh sách đơn hàng dựa trên giá trị của "type"
    const fetchOrdersByType = (type) => {
        const status = statusMap[type] || 'Pending'; // Lấy status theo type
        return userOrders?.filter(order => order.status === status) || []; // Lọc đơn hàng theo trạng thái
    };

    // Sử dụng useEffect để cập nhật danh sách đơn hàng khi type thay đổi
    useEffect(() => {
        const type = searchParams.get('type') || '1'; // Lấy giá trị type từ URL, mặc định là '1'
        const ordersByType = fetchOrdersByType(type); // Lấy danh sách đơn hàng theo type
        setOrders(ordersByType);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams, userOrders]); // Thêm userOrders vào dependency để cập nhật khi dữ liệu thay đổi

    const handleMenuClick = (key) => {
        const selectedItem = items.find(item => item.key === key);
        if (selectedItem) {
            // Điều hướng đến URL với query parameter type tương ứng
            navigate(`/user/purchase?type=${selectedItem.type}`);
        }
    };

    const handleGetDetailOrder = (id) => {
        navigate(`/user/purchase/${id}`)
    }

    return (
        <WrapperContent span={20}>
            <div>
                {location.pathname === '/user/purchase' ? (
                    <>
                        <ContentMenu
                            onClick={(e) => handleMenuClick(e.key)}
                            style={{
                                backgroundColor: '#f5f5f5',
                                width: '100%',
                                height: '50px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            selectedKeys={[`sub${searchParams.get('type') || '1'}`]} // Đặt key dựa trên query parameter
                            mode="horizontal"
                            items={items.map((item) => ({
                                key: item.key,
                                label: (
                                    <span style={{ display: 'inline-block', position: 'relative' }}>
                                        <span>{item.label}</span>
                                        <Badge
                                            count={orderCounts(item.type)}
                                            overflowCount={99}
                                            style={{
                                                position: 'absolute',
                                                top: -20,
                                                right: -16,
                                            }}
                                        />
                                    </span>
                                ),
                            }))}
                        />
                        <ConfigProvider
                            theme={{
                                token: {
                                    colorPrimaryBorder: 'rgb(34, 193, 195)',
                                },
                                components: {
                                    Menu: {
                                        itemSelectedColor: 'rgb(34, 193, 195)', // Change text color of selected item
                                        activeBarHeight: 2, // Height of the underline
                                        activeBarBorderWidth: '2px', // Width of the underline
                                        horizontalItemSelectedColor: 'rgb(34, 193, 195)', // Color of selected menu item
                                        horizontalItemSelectedBg: 'transparent', // Background of selected item
                                        horizontalItemHoverColor: 'rgb(34, 193, 195)', // Hover color
                                    },
                                },
                            }}
                        >

                        </ConfigProvider>
                        {orders.length > 0 ? (
                            <div style={{ height: '450px', overflowY: 'auto' }}>
                                {orders.map((order, index) => (
                                    <div key={index} style={{ cursor: "pointer" }} onClick={() => handleGetDetailOrder(order._id)}><DetailOrderComponent product={order} ></DetailOrderComponent></div>
                                ))}
                            </div>
                        ) : (
                            <WrapperFlex>
                                <img
                                    src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/orderlist/5fafbb923393b712b964.png"
                                    alt="empty"
                                    style={{
                                        backgroundPosition: '50%',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: 'contain',
                                        height: '100px',
                                        width: '100px',
                                    }}
                                />
                                <span>Chưa có đơn hàng</span>
                            </WrapperFlex>
                        )}
                    </>
                ) : (
                    <Outlet />
                )}
            </div>

        </WrapperContent>
    );
};

export default PurchaseOrder;
