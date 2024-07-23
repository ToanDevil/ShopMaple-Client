import { Col, Space } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import styled from 'styled-components';

// export const WrapperSearch = styled(Search)`
//   .ant-input-search-button {
//     width: 60px;
//     color: rgb(251,85,51);
//   }
// `
export const WrapperHeader = styled.div`
  height: 120px;
  background: rgb(34,193,195);
  background: l
`
export const ColLogo = styled(Col)`
  font-size: 24px;
`
export const CartIcon = styled(ShoppingCartOutlined)`
  font-size: 30px;
  color: rgb(248,71,47)
`
export const Option = styled(Space)`
  padding-right: 8px;
  padding-top: 2px;
`

export const TextSign = styled.span`
  cursor: pointer;
  color: rgb(248,71,47);
  font-weight: 500
`
export const LinkCustom = styled.span`
  cursor: pointer;
`

export const Link = styled.span`
  cursor: pointer;
  &:hover{
    color: rgb(248,71,47)
  }
`