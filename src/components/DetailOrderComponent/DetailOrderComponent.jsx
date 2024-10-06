import React, { useEffect, useState } from 'react';
import { WrapperOrder } from './style';
import { Col, Row, Tooltip } from 'antd';
import { format } from 'date-fns';



const DetailOrderComponent = ({ product }) => {
    const [status, setStatus] = useState('')
    const [note, setNote] = useState('')

    useEffect(() => {
        if (product.status === 'Pending') { setStatus('Chờ xác nhận'); setNote(`* Đơn hàng đang chờ duyệt từ người bán. Ngày đặt hàng ${format(new Date(product.createdAt), 'dd/MM/yyyy')}`)}
        else if (product.status === 'Processing') { setStatus('Chuẩn bị hàng'); setNote(`* Người gửi đang chuẩn bị hàng`) }
        else if (product.status === 'Shipped') { setStatus('Đang giao'); setNote(`* Đơn hàng đang trên đường giao tới bạn. `) }
        else if (product.status === 'Delivered') { setStatus('Đã giao'); setNote(`* Ấn xác nhận khi bạn đã nhận được hàng.`) }
        else if (product.status === 'Cancelled') { setStatus('Đã hủy') }
    }, [product])
    return (
        <WrapperOrder>
            <div style={{ borderBottom: 'solid 1px #bbb', padding: '10px 30px', color: '#aaa', display: 'flex', justifyContent: 'flex-end' }}>
                <span>Mã đơn hàng: {product._id}</span>
            </div>
            <div style={{ padding: '5px 30px 20px 30px' }}>
                <div>
                    {product.items.map((item) => (
                        <div key={item._id} style={{ margin: '15px 0' }}>
                            <Row>
                                <Col span={12} style={{display: 'flex'}}>
                                    <img alt='ảnh sp' src={item.productDetail.image} style={{ width: '60px', height: '60px', objectFit: 'cover' }}></img>
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
                                <Col span={12} style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'end', color: '#bbb'}}>
                                    <span>{item.productDetail.price.toLocaleString()} x {item.amount}</span>
                                </Col>
                            </Row>
                        </div>
                    ))}
                </div>
                <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom: '10px'}}><span style={{color: '#bbb', paddingRight: '5px'}}>Tổng giá:</span> {product.orderDetails.orderPrice.toLocaleString()} đ</div>
                <Row>
                    <Col span={12} style={{display: 'flex', alignItems: 'center', color: '#bbb'}}>
                        <span>{note}</span>
                    </Col>
                    <Col span={12} style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <div style={{ display: 'flex', alignItems: 'center',justifyContent: 'center', minWidth: '120px', height: '30px', background: 'rgb(248, 130, 112)', color: '#fff', borderRadius: '4px'}}>
                            <span>{status}</span>
                        </div>
                    </Col>
                </Row>
            </div>
        </WrapperOrder>
    );
};

export default DetailOrderComponent