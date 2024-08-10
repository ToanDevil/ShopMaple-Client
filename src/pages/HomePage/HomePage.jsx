import React, { useState } from 'react';
import TypeProductComponent from '../../components/TypeProductComponent/TypeProductComponent';
import { Flex, Pagination } from 'antd';
import SliderComponent from '../../components/SliderComponent/SliderComponent';
import slide1 from '../../asset/images/slide1.jpg';
import slide2 from '../../asset/images/slide2.jpg';
import slide3 from '../../asset/images/slide3.jpg';
import slide4 from '../../asset/images/slide4.jpg';
import slide5 from '../../asset/images/slide5.jpg';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { WrapperCardComponent } from '../CategoryProductPage/style';
import { useQuery } from '@tanstack/react-query';
import * as ProductService from '../../services/ProductService'
import * as CategoryProductService from '../../services/CategoryProductService'
import { useNavigate } from 'react-router-dom';
import { BtnShowMoreProduct, Container, ContainerProduct } from './style.js';

const HomePage = () => {
  const [showMore, setShowMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate()

  const fetchAllProduct = async () => {
    const res = await ProductService.getAllProduct()
    return res
  }
  const { data: products } = useQuery({ queryKey: ['products'], queryFn: fetchAllProduct })

  // hiển thị danh sách danh mục sản phẩm
  const fetchAllCategory = async () => {
    const res = await CategoryProductService.getAllCategory();
    return res;
  };

  const { data: categories } = useQuery({ queryKey: ['categories'], queryFn: fetchAllCategory });

  // console.log('Products', products)
  const itemsPerPage = 24; // Số sản phẩm trên mỗi trang

  // Mảng chứa các phần tử JSX của WrapperCardComponent
  let wrapperCardComponents = [];

  // Duyệt qua mỗi phần tử và thêm vào mảng JSX
  const lengthProduct = products?.data?.length || 0;

  if (lengthProduct > 30) {
    for (let i = 0; i < 30; i++) {
      const product = products?.data[i]
      wrapperCardComponents.push(
        <WrapperCardComponent key={product?._id} width="calc(16.66667% - 10px)" product={product} />
      )
    }
  }
  else {
    wrapperCardComponents = [];
    for (let i = (currentPage - 1) * itemsPerPage; i < Math.min(currentPage * itemsPerPage, lengthProduct); i++) {
      const product = products?.data[i]
      wrapperCardComponents.push(
        <WrapperCardComponent key={product?._id} width="calc(16.66667% - 10px)" product={product} />
      )
    }
  }

  const handleShowMore = () => {
    setShowMore(true);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const handleNavigateCategoryProductPage = (categoryId) => {
    navigate(`/category/${categoryId}`)
  }

  return (
    <Container>
      <Flex justify='flex-start' align='center' style={{backgroundColor: '#fff'}}>
        {categories?.data.map(category => (
          <TypeProductComponent name={category.name} key={category._id} onClick={() => handleNavigateCategoryProductPage(category._id)}/>
        ))}
      </Flex>
      <SliderComponent arrImage={[slide1, slide2, slide3, slide4, slide5]} />
      <ContainerProduct>
        <Flex justify='flex-start' align='flex-start' wrap='wrap' gap={'10px'}>
          {wrapperCardComponents}
        </Flex>
        {!showMore && wrapperCardComponents.length < lengthProduct && (
          <BtnShowMoreProduct>
            <ButtonComponent name="Xem thêm" onClick={handleShowMore} />
          </BtnShowMoreProduct>
        )}
        {
          showMore && (
            <Pagination
              defaultCurrent={currentPage}
              total={lengthProduct}
              pageSize={itemsPerPage}
              onChange={handlePageChange}
            />
          )
        }
      </ContainerProduct>
    </Container>
  );
};

export default HomePage;
