import React, { useState } from 'react';
import { Tag, Discount, DiscountText, Price, Unit, Sold, CustomCard } from './style';
import { Flex } from 'antd';
import { Typography } from 'antd';

const { Paragraph } = Typography;
const CardComponent = ({width, product}) => {
  const [ellipsis] = useState(true);
  const [rows] = useState(2);
  return (
    <CustomCard
        hoverable
        style={{width: width}}
        cover={<img alt="example" src={product.image} style={{ objectFit: 'cover', height: '200px' }}/>}
    >
      <Tag/>
      <Discount>
        <DiscountText>-43%</DiscountText>
      </Discount>
      <div>
        <Paragraph ellipsis={{ ellipsis, rows }} style={{height: '3em', lineHeight:'1,5em'}}>{product.name}</Paragraph>
        <Flex justify='flex-start' align='center'>
          <Unit>₫</Unit>
          <Price>{product.price}</Price>
        </Flex>
        <Sold>Đã bán 34,2k</Sold>
      </div>
    </CustomCard>
  )
}

export default CardComponent