import React, { useState } from 'react'
import { 
    ButtonQuantity, GroupButton, InputQuantity, MoreInfo, 
    Price, UnitPrice, WrapperContainer, WrapperContent, WrapperRow 
} from './style'
import { Breadcrumb, Col, Flex } from 'antd'
import { MinusOutlined,PlusOutlined } from '@ant-design/icons';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import FreeShipIcon from '../../asset/images/freeShip.png'

const ProductDetailPage = () => {
    const [value, setValue] = useState(1);

    const onChange = (newValue) => {
        setValue(newValue);
    };
    const description = `
        🌈 Chào mừng đến với cửa hàng của chúng tôi.
        
        🌈 Theo dõi cửa hàng để nhận phiếu giảm giá ”◕‿◕｡
    

        🌈 Nếu bạn hài lòng với sản phẩm và dịch vụ của chúng tôi Lời khen ngợi năm sao
    


        🚚 Sản phẩm đến từ Trung Quốc và mất một thời gian để vận chuyển
    

        💕 Phải mặc! Phổ biến vào năm 2023!
    

        💕Được làm bằng chất liệu cao cấp, đủ bền để bạn mặc hàng ngày!
    
        💕 Thật thoải mái Chất liệu vải mềm mại, hình dáng đẹp, chất lượng tốt
        
        💕 Thiết kế đẹp, sang trọng, độc đáo.
    
        💕 Nó là một món quà tốt cho người yêu của bạn hoặc chính bạn.
    
        ❣️ Chất lượng và giá cả như thế này không thể tìm thấy ở bất kỳ nơi nào khác, rất đáng đồng tiền.
    
        ❣️ Do các thiết bị hiển thị và chiếu sáng khác nhau, hình ảnh có thể không phản ánh màu sắc thực tế của tất cả các sản phẩm. Cảm ơn bạn đã thông cảm ❣️
    
        ❣️ Đánh giá 1 hoặc 2 sao không có lý do / hình minh họa. hoặc đặt điều gì đó không đúng sự thật làm hỏng danh tiếng của shop shop sẽ không giúp gì cả vì bạn được coi là đang vào vì lợi ích của Shop, đặc biệt cảm ơn quý khách hàng đã có nhu cầu vui lòng đặt hàng hoặc yêu cầu thêm thông tin tin tin nhé
    `
    const descriptionSingleLine = description.split('\n').map(line => line.trim()).filter(line => line !== '');

    return (
        <WrapperContainer>
            <Breadcrumb
                items={[
                {
                    title: 'Trang chủ',
                },
                {
                    title: <span>Đồ chơi</span>,
                },
                {
                    title: <span>Gấu bông</span>,
                },
                {
                    title: 'chi tiết',
                },
                ]}
            />
            <WrapperContent>
                <Col span={8}>
                    <img
                        alt="example"
                        src="https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-loxthz3zlye3ab_tn.webp"
                        style={{ width: '100%', objectFit: 'cover', backgroundSize: 'cover' }}
                    />
                    <div style={{display: 'flex', justifyContent:'flex-start', gap: '10px'}} >
                        <img
                            alt="example"
                            src="https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-loxthz3zlye3ab_tn.webp"
                            style={{ width: '20%', objectFit: 'cover', backgroundSize: 'cover' }}
                        />
                        <img
                            alt="example"
                            src="https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-loxthz3zlye3ab_tn.webp"
                            style={{ width: '20%', objectFit: 'cover', backgroundSize: 'cover' }}
                        />
                        <img
                            alt="example"
                            src="https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-loxthz3zlye3ab_tn.webp"
                            style={{ width: '20%', objectFit: 'cover', backgroundSize: 'cover' }}
                        />
                    </div>
                </Col>
                <Col span={16} style={{padding: '0 40px'}}>
                    <div style={{marginBottom: '20px'}}>
                        <span style={{fontSize: '2.5rem'}}>Đồ chơi nhồi bông hình mèo hoạt hình Cinderella Lucifer - Mèo Disney Mặt Quạu Quà Tặng Cao Cấp Gấu Bông City</span>
                    </div>
                    <Flex justify='flex-start' align='center'>
                        <div style={{borderRight: 'solid 1px #e8e8e8'}}><span style={{paddingRight: '15px'}}>Đánh giá: 4.6/5</span></div>
                        <div style={{borderRight: 'solid 1px #e8e8e8'}}><span style={{padding: '0 15px'}}>1,3k Đánh giá</span></div>
                        <div><span style={{paddingLeft: '15px'}}>2k Đã bán</span></div>
                    </Flex>
                    <div style={{margin: '30px 0'}}>
                        <Price><UnitPrice>₫</UnitPrice>80.000 - <UnitPrice>₫</UnitPrice>120.000</Price>
                    </div>
                    <div>
                        <WrapperRow>
                            <Col span={4}><MoreInfo>Chính sách trả hàng</MoreInfo></Col>
                            <Col span={20}>
                                <div>
                                    <span style={{paddingRight: '10px'}}>Trả hàng trong 15 ngày</span>
                                    <MoreInfo>Đổi ý miễn phí </MoreInfo>
                                </div>
                            </Col>
                        </WrapperRow>
                        <WrapperRow>
                            <Col span={4}><MoreInfo>Vận chuyển</MoreInfo></Col>
                            <Col span={20}>
                                <Flex justify='flex-start' align='center'>
                                    <img src={FreeShipIcon} alt="Free Shipping Icon" style={{width: '20px', marginRight: '5px'}}></img>
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
            <div style={{margin: '40px', fontSize: '2.2rem', fontWeight: '500'}}>Mô tả sản phẩm</div>
            <WrapperContent>
                {descriptionSingleLine.map((line, index) => (
                    <p key={index}>{line}</p>
                ))}
            </WrapperContent>
        </WrapperContainer>
    )
}

export default ProductDetailPage