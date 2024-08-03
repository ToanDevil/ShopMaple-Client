import React, { useEffect, useState } from 'react'
import {
    ButtonQuantity, GroupButton, InputQuantity, MoreInfo,
    Price, UnitPrice, WrapperContainer, WrapperContent, WrapperRow
} from './style'
import { Breadcrumb, Col, Flex } from 'antd'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import FreeShipIcon from '../../asset/images/freeShip.png'
import * as ProductService from '../../services/ProductService'
import { useNavigate, useParams } from 'react-router-dom';
import Link from 'antd/es/typography/Link';

const ProductDetailPage = () => {
    const [value, setValue] = useState(1);
    const [product, setProduct] = useState(null);
    const navigate = useNavigate()
    const { id } = useParams();
    const onChange = (newValue) => {
        setValue(newValue);
    };
    const handleNavigateHome = () => {
        navigate('/')
    }

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await ProductService.getDetailProduct(id);
                setProduct(res.data.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [id]);

    return (
        <WrapperContainer>
            <Breadcrumb
                items={[
                    {
                        title: <Link onClick={handleNavigateHome}>Trang chủ</Link>,
                    },
                    {
                        title: <span>{product?.type}</span>,
                    },
                    {
                        title: <span>{product?.name}</span>,
                    },
                ]}
            />
            <WrapperContent>
                <Col span={8}>
                    <img
                        alt="example"
                        src={product?.image}
                        style={{ width: '100%', objectFit: 'cover', backgroundSize: 'cover' }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '10px' }} >
                        <img
                            alt="example"
                            src={product?.image}
                            style={{ width: '20%', objectFit: 'cover', backgroundSize: 'cover' }}
                        />
                        <img
                            alt="example"
                            src={product?.image}
                            style={{ width: '20%', objectFit: 'cover', backgroundSize: 'cover' }}
                        />
                        <img
                            alt="example"
                            src={product?.image}
                            style={{ width: '20%', objectFit: 'cover', backgroundSize: 'cover' }}
                        />
                    </div>
                </Col>
                <Col span={16} style={{ padding: '0 40px' }}>
                    <div style={{ marginBottom: '20px' }}>
                        <span style={{ fontSize: '2.5rem' }}>{product?.name}</span>
                    </div>
                    <Flex justify='flex-start' align='center'>
                        <div style={{ borderRight: 'solid 1px #e8e8e8' }}><span style={{ paddingRight: '15px' }}>Đánh giá: 4.6/5</span></div>
                        <div style={{ borderRight: 'solid 1px #e8e8e8' }}><span style={{ padding: '0 15px' }}>1,3k Đánh giá</span></div>
                        <div><span style={{ paddingLeft: '15px' }}>2k Đã bán</span></div>
                    </Flex>
                    <div style={{ margin: '30px 0' }}>
                        <Price><UnitPrice>₫</UnitPrice>{product?.price}</Price>
                    </div>
                    <div>
                        <WrapperRow>
                            <Col span={4}><MoreInfo>Chính sách trả hàng</MoreInfo></Col>
                            <Col span={20}>
                                <div>
                                    <span style={{ paddingRight: '10px' }}>Trả hàng trong 15 ngày</span>
                                    <MoreInfo>Đổi ý miễn phí </MoreInfo>
                                </div>
                            </Col>
                        </WrapperRow>
                        <WrapperRow>
                            <Col span={4}><MoreInfo>Vận chuyển</MoreInfo></Col>
                            <Col span={20}>
                                <Flex justify='flex-start' align='center'>
                                    <img src={FreeShipIcon} alt="Free Shipping Icon" style={{ width: '20px', marginRight: '5px' }}></img>
                                    <span> Miễn phí vận chuyển</span>
                                </Flex>
                            </Col>
                        </WrapperRow>
                        <WrapperRow>
                            <Col span={4}><MoreInfo>Số lượng</MoreInfo></Col>
                            <Col span={20}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <ButtonQuantity onClick={() => value > 1 ? onChange(value - 1) : onChange(value)}><MinusOutlined /></ButtonQuantity>
                                    <InputQuantity min={1} value={value} onChange={onChange} />
                                    <ButtonQuantity onClick={() => onChange(value + 1)}><PlusOutlined /></ButtonQuantity>
                                </div>
                            </Col>
                        </WrapperRow>
                        <GroupButton>
                            <ButtonComponent name="Thêm vào giỏ hàng" color="#ffeee8" textColor='red' width='45%'></ButtonComponent>
                            <ButtonComponent name="Mua ngay" width='45%'></ButtonComponent>
                        </GroupButton>
                    </div>
                </Col>
            </WrapperContent>
            <div style={{ margin: '40px', fontSize: '2.2rem', fontWeight: '500' }}>Mô tả sản phẩm</div>
            <WrapperContent>
                <div dangerouslySetInnerHTML={{ __html: product?.description }} />
            </WrapperContent>
        </WrapperContainer>
    )
}

export default ProductDetailPage