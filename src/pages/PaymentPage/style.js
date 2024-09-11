import { List, Table } from "antd";
import styled from "styled-components";

export const Container = styled.div`
    margin: 20px 150px;
    font-size: 1.6rem;
`

export const WrapperTable = styled(Table)`
  .ant-table-thead > tr > th {
    background-color: #f5f5f5;
    border-bottom: 2px solid #e8e8e8;
    padding-bottom: 16px;
  }

  .ant-table-tbody > tr > td {
    padding-top: 16px;
  }
`;

export const TableTitle = styled.div`
  padding: 16px;
  font-size: 18px;
  background-color: #f0f0f0;
  border-bottom: 1px solid #d9d9d9;
  font-weight: bold;
  margin-bottom: 20px
`;

export const WrapperSession = styled.div`
  align-items: center ;
  justify-content: space-between; 
  background-color: #fff; 
  margin: 20px 0; 
  position: sticky; 
  bottom: 0; 
  height: 100px
`

export const ListItemMetaStyled = styled(List.Item.Meta)`
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 16px;

  .ant-list-item-meta-title {
    font-weight: bold;
    font-size: 16px;
  }

  .ant-list-item-meta-description {
    line-height: 1.5; /* Thay vì 4rem để phù hợp hơn */
    color: gray;
    font-size: 14px;
  }
`;

export const PaymentOptionContainer = styled.div`
  display: flex;
  gap: 20px; 
  background-color: #fff;
  margin-top: 20px;
  padding: 20px;
  align-items: flex-end
`;

export const PaymentOption = styled.span`
  padding: 5px;
  border: 1px solid #ccc; /* Viền mặc định */
  border-radius: 4px;
  position: relative;
  cursor: pointer;
  transition: border-color 0.3s;
  color: #aaa;

  &:hover {
    border-color: rgb(248, 75, 47); /* Viền màu cam khi hover */
  }

  &.selected {
    border-color: rgb(248, 75, 47); /* Viền màu cam khi chọn */
  }

  &.selected::after {
    content: '✔';
    position: absolute;
    top: -5px;
    right: -5px;
    font-size: 12px;
    color: rgb(248, 75, 47) !important;
    background-color: white;
    border-radius: 50%;
  }
`;