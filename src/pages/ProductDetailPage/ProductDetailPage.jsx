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
import * as CartService from '../../services/CartService'
import * as m from '../../components/MessageComponent/MessageComponent'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Link from 'antd/es/typography/Link';
import { useDispatch, useSelector } from 'react-redux';
import { updateSizeCart } from '../../redux/slices/cartSlice';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const ProductDetailPage = () => {
    const [amount, setAmount] = useState(1);
    const [product, setProduct] = useState(null);
    const location = useLocation()
    const queryClient = useQueryClient();
    const user = useSelector((state) => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { id } = useParams();
    const onChange = (newValue) => {
        setAmount(newValue);
    };
    const handleNavigateHome = () => {
        navigate('/')
    }
    const handleNavigateCategoryProductPage = () => {
        navigate(`/category/${product.type}`)
    }

    const FormattedPrice = ({ value }) => {
        const formattedPrice = Number(value).toLocaleString('vi-VN');
        return <Price>{formattedPrice}</Price>;
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await ProductService.getDetailProduct(id);
                const p = res.data.data
                const c_p = { ...p._doc, type_name: p.type }
                // console.log('c_p', c_p)
                setProduct(c_p);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [id]);

    // get all item in cart
    const fetchAllItems = async () => {
        const res = await CartService.getAllItem(user?.id);
        return res.data;
    };
    const { refetch } = useQuery({
        queryKey: ['items', user?.id],  // Thêm user.id vào queryKey để theo dõi thay đổi
        queryFn: fetchAllItems,
        enabled: !!user?.id,  // Chỉ chạy khi user.id tồn tại
    });
    const handleAddToCart = async () => {
        if (!user.id) {
            navigate('/sign-in', { state: location?.pathname })
        } else {
            const res = await CartService.add(id, { amount: amount, userId: user.id })
            if (res?.status === "OK") {
                m.success("Thêm vào giỏ hàng thành công")
                await refetch();
                const updatedItems = queryClient.getQueryData(['items']);
                dispatch(updateSizeCart({ number: updatedItems?.length }));
            }
        }
    }

    useEffect(() => {
        const fetchListItems = async (id) => {
            try {
                const res = await CartService.getAllItem(id);
                dispatch(updateSizeCart({ number: res?.data.length }))
            } catch (err) {
                console.error('Error fetching items:', err);
            }
        };

        if (user?.id) {
            fetchListItems(user.id);
        }
    }, [user, dispatch]);


    return (
        <WrapperContainer>
            <Breadcrumb
                items={[
                    {
                        title: <Link onClick={handleNavigateHome}>Trang chủ</Link>,
                    },
                    {
                        title: <Link onClick={handleNavigateCategoryProductPage}>{product?.type_name}</Link>,
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
                        style={{ width: '85%', height: '400px', objectFit: 'cover', backgroundSize: 'cover' }}
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
                        <Flex justify='flex-start' align='center'>
                            <UnitPrice>₫</UnitPrice>
                            <FormattedPrice value={product?.price} />
                        </Flex>
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
                                    <ButtonQuantity onClick={() => amount > 1 ? onChange(amount - 1) : onChange(amount)}><MinusOutlined /></ButtonQuantity>
                                    <InputQuantity min={1} value={amount} onChange={onChange} max={product?.quantity} />
                                    <ButtonQuantity onClick={() => onChange(amount + 1)}><PlusOutlined /></ButtonQuantity>
                                </div>
                            </Col>
                        </WrapperRow>
                        <GroupButton>
                            <ButtonComponent name="Thêm vào giỏ hàng" color="#ffeee8" textColor='red' width='45%' onClick={handleAddToCart}></ButtonComponent>
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