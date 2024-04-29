import React from 'react'
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent'
import { Flex, Row } from 'antd'
import { WrapperCardComponent, WrapperContainer,Col20, Col4 } from './style'

const TypeProductPage = () => {
  // Mảng chứa các phần tử JSX của WrapperCardComponent
  const wrapperCardComponents = [];

  // Duyệt qua mỗi phần tử và thêm vào mảng JSX
  for (let i = 0; i < 20; i++) {
    wrapperCardComponents.push(
      <WrapperCardComponent key={i} width="calc(20% - 10px)" />
    );
  }
  return (
    <WrapperContainer>
        <Row>
          <Col4 span={4}>
            <NavbarComponent></NavbarComponent>
          </Col4>
          <Col20 span={20}>
            <Flex justify='flex-start' align='flex-start' wrap='wrap' gap={'10px'}>
              {wrapperCardComponents}
            </Flex>
          </Col20>
        </Row>
    </WrapperContainer>
  )
}

export default TypeProductPage