import React, { useEffect, useState } from 'react';
import FlowingOrderComponent from '../FlowingOrderComponent/FlowingOrderComponent';
import { useNavigate, useParams } from 'react-router-dom';
import * as OrderService from '../../services/OrderService';
import { LeftOutlined } from '@ant-design/icons';
import { Button, Col, Image, Row, Tooltip, Tag, Divider } from 'antd';
import LoadingComponent from '../LoadingComponent/LoadingComponent';

const PerOrderDetailComponent = () => {
    const { id } = useParams();
    const [orderDetail, setOrderDetail] = useState();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchDetailOrderById = async () => {
            try {
                const res = await OrderService.getDetailOrderById(id);
                if (res) {
                    console.log(res?.data);
                    setLoading(false)
                    setOrderDetail(res?.data);
                }
            } catch (error) {
                console.error("Error fetching order details:", error);
            }
        };

        fetchDetailOrderById();
    }, [id]);

    const handleBack = () => {
        navigate('/user/purchase');
    };

    const getStatusTag = (status) => {
        switch (status) {
            case "Pending":
                return <Tag color="orange">Chờ xác nhận</Tag>;
            case "Processing":
                return <Tag color="orange">Đang chuẩn bị</Tag>;
            case "Shipped":
                return <Tag color="blue">Đang giao</Tag>;
            case "Delivered":
                return <Tag color="green">Đã giao hàng</Tag>;
            case "Canceled":
                return <Tag color="red">Đã hủy</Tag>;
            default:
                return <Tag color="gray">Không rõ</Tag>;
        }
    };

    return (
        <>
            {loading ? (<LoadingComponent></LoadingComponent>) : (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', backgroundColor: 'rgb(245, 245, 245)', height: '50px' }}>
                        <Button onClick={handleBack} style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
                            <LeftOutlined />
                            <span>Trở về</span>
                        </Button>
                        <div>
                            <span style={{ marginRight: '10px' }}>Mã đơn hàng:</span>
                            {orderDetail?._id} | {getStatusTag(orderDetail?.status)}
                        </div>
                    </div>

                    <FlowingOrderComponent status={orderDetail?.status}></FlowingOrderComponent>

                    <Divider />

                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>Thông tin sản phẩm</div>
                            {orderDetail?.orderDetails.items.map((item, index) => (
                                <div key={index} style={{ marginBottom: '15px' }}>
                                    <Row>
                                        <Col span={20} style={{ display: 'flex' }}>
                                            <Image alt='ảnh sp' src={item.productDetail.image} style={{ width: '60px', height: '60px', objectFit: 'cover' }}></Image>
                                            <Tooltip title={item.productDetail.name}>
                                                <span
                                                    style={{
                                                        maxWidth: '350px',
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 3,
                                                        WebkitBoxOrient: 'vertical',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'normal',
                                                        lineHeight: '20px',
                                                        height: '60px',
                                                        padding: '0 20px',
                                                    }}
                                                >
                                                    {item.productDetail.name}
                                                </span>
                                            </Tooltip>
                                        </Col>
                                        <Col span={4} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'end', color: '#bbb' }}>
                                            <span>{item.productDetail.price.toLocaleString()} x {item.amount}</span>
                                        </Col>
                                    </Row>
                                </div>
                            ))}
                            <div style={{ textAlign: 'right', fontWeight: 'bold', fontSize: '16px', marginTop: '20px' }}>
                                Tổng giá: <span style={{ color: 'rgb(248, 75, 47)' }}>{orderDetail?.orderDetails?.orderPrice.toLocaleString()} đ</span>
                            </div>
                        </Col>

                        <Col span={12}>
                            <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>Thông tin đặt hàng</div>
                            <div style={{paddingBottom: '5px'}}>Người đặt hàng: {orderDetail?.orderDetails?.userDetail?.name}</div>
                            <div style={{paddingBottom: '5px'}}>Số điện thoại: 0{orderDetail?.orderDetails?.userDetail?.phone}</div>
                            <div style={{paddingBottom: '5px'}}>Địa chỉ nhận hàng: {orderDetail?.orderDetails?.addressDetail?.homeNumber}, {orderDetail?.orderDetails?.addressDetail?.commune}, {orderDetail?.orderDetails?.addressDetail?.district}, {orderDetail?.orderDetails?.addressDetail?.city}</div>
                            <div style={{paddingBottom: '5px'}}>Hình thức thanh toán: {orderDetail?.orderDetails?.payMethod === "cod" ? "Thanh toán khi nhận hàng" : "Thanh toán paypal"}</div>
                        </Col>
                    </Row>
                </div>
            )
            }

        </>

    );
};

export default PerOrderDetailComponent;
