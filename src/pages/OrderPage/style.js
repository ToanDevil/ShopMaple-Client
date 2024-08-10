import { Table } from "antd";
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