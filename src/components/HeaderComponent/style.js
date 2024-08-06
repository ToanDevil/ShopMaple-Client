import { Col, Space, Input } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import styled from 'styled-components';
const { Search } = Input;

// export const WrapperSearch = styled(Search)`
//   .ant-input-search-button {
//     width: 60px;
//     color: rgb(251,85,51);
//   }
// `
export const WrapperHeader = styled.div`
  height: 120px;
  background: rgb(34,193,195);
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
export const CustomSearch = styled(Search)`
  width: 100%; // Adjust the width of the Search input
  margin: 0 44px;
  .ant-input-group-addon button {
    height: 40px; 
    border: 4px solid white;
    width: 70px;
    background-color: rgb(248, 75, 47); 
    color: white;
    display: flex;
    align-items: center;
    justify-content: center; 
  }

  :where(.css-dev-only-do-not-override-1qfezbu).ant-btn-primary:not(:disabled):not(.ant-btn-disabled):hover{
    background-color: rgb(248, 75, 47);
  }

  .ant-input {
    height: 40px; // Adjust the height of the input field to match the button
  }
  .ant-btn-icon {
    font-size: 18px;
  }
`;