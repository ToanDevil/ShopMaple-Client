import { Card } from 'antd';
import styled from 'styled-components';

export const CustomCard = styled(Card)`
    .ant-card-body {
        padding: 10px; 
    }
`;

export const Tag = styled.div`
  background-image: url('https://down-vn.img.susercontent.com/file/76c36bd87ff2eb5887d9ad3516111869');
  width: 46px;
  height: 18px;
  background-repeat: no-repeat;
  background-size: contain;
  top: 10px;
  left: -4px;
  position: absolute;
`;

export const Discount = styled.div`
  padding-bottom: 0.125rem; 
  background-color: rgba(255, 233, 122, 1);
  border-bottom-left-radius: 0.125rem;
  line-height: 1.9rem;
  top: -1px;
  right: -1px;
  position: absolute;
  border-top-right-radius: 8px;
`;

export const DiscountText = styled.span`
  padding-left: 0.25rem;
  padding-right: 0.25rem; 
  color: rgba(236, 56, 20, 1);
  line-height: .875rem;
  font-weight: 500;
  font-size: .95rem;
`;

export const Price = styled.span`
  color: red;
  line-height: 1.25rem;
`;

export const Unit = styled.span`
  color: red;
  font-size: 0.9rem;
`;

export const Sold = styled.span`
  color: rgba(0, 0, 0, .54118);
  font-size: 0.85rem;
`;
