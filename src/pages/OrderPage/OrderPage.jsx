import React, { useEffect, useState } from 'react';
import { Container, TableTitle } from './style';
import { Button, Empty, Flex, Image, Tooltip } from 'antd';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { WrapperTable } from '../../components/AdminPageProduct/style';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonQuantity, InputQuantity, Price } from '../ProductDetailPage/style';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { useNavigate } from 'react-router-dom';
import * as CartService from '../../services/CartService';
import * as m from '../../components/MessageComponent/MessageComponent'
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { updateSizeCart } from '../../redux/slices/cartSlice';
import { addOrder } from '../../redux/slices/orderSlice';

const OrderPage = () => {
    const user = useSelector((state) => state.user);
    const [amount, setAmount] = useState(1);
    const [totalAmount, setTotalAmount] = useState(0); //số tiền của các mặt hàng đã chọn

    const [productId, setProductId] = useState('')
    const queryClient = useQueryClient();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const onChange = (newValue, id) => {
        setAmount(newValue);
        setProductId(id)
    };

    useEffect(() => {
        const fetchUpdateAmount = async () => {
            await CartService.updateAmount(productId, { amount: amount });
            queryClient.invalidateQueries(['items']);
        }
        if (amount && productId) {
            fetchUpdateAmount();
        }
    }, [amount, productId, queryClient])

    const fetchAllItems = async () => {
        const res = await CartService.getAllItem(user?.id);
        return res.data;
    };
    const { data: items } = useQuery({
        queryKey: ['items', user?.id],  // Thêm user.id vào queryKey để theo dõi thay đổi
        queryFn: fetchAllItems,
        enabled: !!user?.id,  // Chỉ chạy khi user.id tồn tại
    });

    const handleDelete = async (productId) => {
        const res = await CartService.deleteItem(productId);
        if (res.status === "OK") {
            queryClient.invalidateQueries(['items']);
            dispatch(updateSizeCart({ number: items.length - 1 }))
            m.success("Xóa thành công")
        }
    }

    const columns = [
        {
            title: 'Sản phẩm',
            dataIndex: 'image',
            key: 'image',
            render: (text, record) => (
                <Image
                    src={record.productId.image}
                    alt="ảnh sản phẩm"
                    width={50}
                    height={50}
                    style={{ objectFit: 'cover' }}
                />
            ),
        },
        {
            dataIndex: 'name',
            key: 'name',
            width: 400,
            render: (text, record) => (
                <Tooltip title={record.productId.name}>
                    <span
                        style={{
                            maxWidth: '250px',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'normal',
                        }}
                    >
                        {record.productId.name}
                    </span>
                </Tooltip>
            ),
        },
        {
            title: 'Đơn giá',
            dataIndex: 'price',
            key: 'price',
            render: (text, record) => (
                <span>{record.productId.price.toLocaleString()} đ</span>
            )
        },
        {
            title: 'Số lượng',
            dataIndex: 'amount',
            key: 'amount',
            render: (text, record) => (
                <Flex justify='flex-start' align='center'>
                    <ButtonQuantity onClick={() => record?.amount > 1 ? onChange(record?.amount - 1, record?.productId?._id) : onChange(record?.amount, record?.productId?._id)}><MinusOutlined /></ButtonQuantity>
                    <InputQuantity min={1} value={record?.amount} onChange={(value) => onChange(value, record?.productId?._id)} max={record?.productId.quantity} />
                    <ButtonQuantity onClick={() => onChange(record?.amount + 1, record?.productId?._id)}><PlusOutlined /></ButtonQuantity>
                </Flex>
            ),
        },
        {
            title: 'Số tiền',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            render: (text, record) => `${(record.productId.price * record.amount).toLocaleString()} đ`, // Tính tổng tiền
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (text, record) => (
                <Button
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => {
                        handleDelete(record?.productId._id)
                    }}
                />
            ),
        },
    ];

    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const handleNavigatePaymentPage = () => {
        const selectedItems = items?.filter(item => selectedRowKeys.includes(item.productId._id)) || [];
        dispatch(addOrder({
            items: selectedItems,
            orderPrice: totalAmount,
            shippingPrice: 0,
            taxPrice: 0,
            totalPrice: totalAmount +  0 + 0,
        }))
        navigate(`/payment/${user.id}`);
    };

    const handleNavigateHome = () => {
        navigate('/')
    }

    useEffect(() => {
        // Tính tổng số tiền cho các sản phẩm được chọn
        const selectedItems = items?.filter(item => selectedRowKeys.includes(item.productId._id)) || [];
        const total = selectedItems.reduce((acc, item) => acc + (item.productId.price * item.amount), 0);
        setTotalAmount(total);
    }, [selectedRowKeys, items]);
    return (
        <Container>
            <TableTitle>Giỏ hàng của tôi</TableTitle>

            {items?.length > 0 ? (
                <>
                    <WrapperTable
                        rowSelection={rowSelection}
                        columns={columns}
                        dataSource={items?.map((item) => ({ ...item, key: item?.productId._id }))}
                        pagination={false}
                        locale={{
                            emptyText: (
                                <Empty
                                    image={Empty.PRESENTED_IMAGE_DEFAULT}
                                    description={
                                        <span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>
                                            Không có sản phẩm nào trong giỏ hàng
                                        </span>
                                    }
                                />
                            ),
                        }}
                    />
                    <Flex align='center' justify='space-between' style={{ backgroundColor: '#fff', margin: '20px 0', position: 'sticky', bottom: '0', height: '100px' }}>
                        <span style={{ paddingLeft: '40px' }}>Sản phẩm đã chọn: {selectedRowKeys?.length}</span>
                        <Flex align='center' justify='space-between' style={{ width: '40%', margin: '0 40px' }}>
                            <span>Tổng giá: <Price>{totalAmount.toLocaleString()} đ</Price></span>
                            <ButtonComponent name="Mua hàng" onClick={handleNavigatePaymentPage} disabled={selectedRowKeys?.length > 0 ? false : true}></ButtonComponent>
                        </Flex>
                    </Flex>
                </>
            ) : (
                <Flex justify='center' align='center' style={{flexDirection:'column', margin: '80px 0'}}>
                    <img src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/cart/9bdd8040b334d31946f4.png' alt='Giỏ hàng trống' style={{width: '100px', height: '100px', marginBottom: '40px'}}></img>
                    <ButtonComponent name="Mua hàng tại đây" onClick={handleNavigateHome}></ButtonComponent>
                </Flex>
            )}

        </Container>
    );
};

export default OrderPage;
