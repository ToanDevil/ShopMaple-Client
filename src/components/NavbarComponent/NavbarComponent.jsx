import React from 'react'
import {FilterOutlined} from '@ant-design/icons';
import FilterProductComponent from './FilterProductComponent/FilterProductComponent';
import { ProductFilterWrapper, ProductFilterTitle } from './style.js';
const NavbarComponent = () => {
  return (
    <ProductFilterWrapper>
        <FilterOutlined />
        <ProductFilterTitle>Bộ lọc tìm kiếm</ProductFilterTitle>
        <FilterProductComponent />
    </ProductFilterWrapper>
  )
}

export default NavbarComponent