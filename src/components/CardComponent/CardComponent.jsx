import React, { useState } from 'react';
import { Tag, Discount, DiscountText, Price, Unit, Sold, CustomCard } from './style';
import { Flex } from 'antd';
import { Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Paragraph } = Typography;
const CardComponent = ({width, product}) => {
  const [ellipsis] = useState(true);
  const [rows] = useState(2);
  const navigate = useNavigate()
  const handleNavigateProductDetail = (id) => {
    navigate(`/product-detail/${id}`);
  };
  const FormattedPrice = ({ value }) => {
    const formattedPrice = Number(value).toLocaleString('vi-VN');
    return <Price>{formattedPrice}</Price>;
  };
  return (
    <CustomCard
        hoverable
        style={{width: width}}
        cover={<img alt="example" src={product.image} style={{ objectFit: 'cover', height: '200px' }}/>}
        onClick={() => handleNavigateProductDetail(product._id)}
    >
      <Tag/>
      <Discount>
        <DiscountText>-43%</DiscountText>
      </Discount>
      <div>
        <Paragraph ellipsis={{ ellipsis, rows }} style={{height: '3em', lineHeight:'1,5em'}}>{product.name}</Paragraph>
        <Flex justify='flex-start' align='center'>
          <Unit>₫</Unit>
          <FormattedPrice value={product.price} />
        </Flex>
        <Sold>Đã bán 34,2k</Sold>
      </div>
    </CustomCard>
  )
}

export default CardComponent