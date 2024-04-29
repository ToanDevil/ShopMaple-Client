import { Button, InputNumber, Row } from "antd";
import styled from "styled-components";

export const WrapperContainer = styled.div`
    margin: 20px 150px
`;

export const WrapperContent = styled(Row)`
    padding: 20px 20px;
    background: #fff
`
export const UnitPrice = styled.span`
    font-size: 1.8rem;
    color: red;
`

export const MoreInfo = styled.span`
    color: #98a397;
    padding-right: 8px;
`
export const WrapperRow = styled(Row)`
    margin-bottom: 25px;
`

export const ButtonQuantity = styled(Button)`
    border-radius: 0;
    padding: 0 4px;
    height: 25px;
` 
export const InputQuantity = styled(InputNumber)`
    .ant-input-number-handler-wrap{
        display: none;
    }
    .ant-input-number-input{
        padding: 0;
        text-align: center;
    }
    border-radius: 0;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const GroupButton = styled.div`
    width: 60%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    bottom: 0;
`

export const Price = styled.span`
    font-size: 2.5rem;
    color: red;
    padding-left: 24px
`