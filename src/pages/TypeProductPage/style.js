import styled from "styled-components";
import CardComponent from "../../components/CardComponent/CardComponent";
import { Col } from "antd";

export const WrapperContainer = styled.div`
    margin: 20px 150px
`;
export const WrapperCardComponent = styled(CardComponent)`
    width: calc(20% - 10px)
`
export const Col20 = styled(Col)`
    margin-top: 35px
`
export const Col4 = styled(Col)`
    padding-right: 25px
`