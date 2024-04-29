import React, { useState } from 'react';
import { Tag, Discount, DiscountText, Price, Unit, Sold, CustomCard } from './style';
import { Flex } from 'antd';
import { Typography } from 'antd';

const { Paragraph } = Typography;
const CardComponent = ({width}) => {
  const [ellipsis] = useState(true);
  const [rows] = useState(2);
  return (
    <CustomCard
        hoverable
        style={{width: width}}
        cover={<img alt="example" src="	https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-loxthz3zlye3ab_tn.webp" style={{ objectFit: 'cover', height: '200px' }}/>}
    >
      <Tag/>
      <Discount>
        <DiscountText>-43%</DiscountText>
      </Discount>
      <div>
        <Paragraph ellipsis={{ ellipsis, rows }}>Ant Design, a design language for background applications, is refined by Ant UED Team. Ant
          Design, a design language for background applications, is refined by Ant UED Team.</Paragraph>
        <Flex justify='flex-start' align='center'>
          <Unit>₫</Unit>
          <Price>100.000</Price>
        </Flex>
        <Sold>Đã bán 34,2k</Sold>
      </div>
    </CustomCard>
  )
}

export default CardComponent