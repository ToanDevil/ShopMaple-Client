import React, { useEffect, useState } from 'react';
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent';
import { Breadcrumb, Flex, Row } from 'antd';
import { WrapperCardComponent, WrapperContainer, Col20, Col4 } from './style';
import * as ProductService from '../../services/ProductService';
import * as CategoryService from '../../services/CategoryProductService';
import { useNavigate, useParams } from 'react-router-dom';
import Link from 'antd/es/typography/Link';
import { useQuery } from '@tanstack/react-query';

const CategoryProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const [nameCategory, setNameCategory] = useState()
  useEffect(()=> {
    async function fetchData(){
      const res = await CategoryService.getCategoryById(id)
      setNameCategory(res.data.name)
    }
    fetchData();
  },[id])

  const fetchListCategoryProduct = async () => {
    const res = await ProductService.getProductByCategoryId(id);
    return res;
  };

  const { data: products } = useQuery({
    queryKey: ['products', id], // Thêm `id` vào queryKey để theo dõi khi `id` thay đổi
    queryFn: fetchListCategoryProduct
  });

  const handleNavigateHome = () => {
    navigate('/')
  }

  return (
    <WrapperContainer>
      <Row>
        <Col4 span={4}>
          <NavbarComponent />
        </Col4>
        <Col20 span={20}>
          <Breadcrumb
            items={[
              {
                title: <Link onClick={handleNavigateHome}>Trang chủ</Link>,
              },
              {
                title: <span>{nameCategory}</span>,
              },
            ]}
          />
          {products?.data.data && products?.data.data.length > 0 ? (
            <Flex justify="flex-start" align="flex-start" wrap="wrap" gap={'10px'} style={{margin:'20px 0'}}>
              {products.data.data.map((product) => (
                <WrapperCardComponent key={product._id} width="calc(20% - 10px)" product={product} />
              ))}
            </Flex>
          ) : (

            <span>Không có sản phẩm nào thuộc loại sản phẩm này</span>

          )}
        </Col20>
      </Row>
    </WrapperContainer>
  );
};

export default CategoryProductPage;
