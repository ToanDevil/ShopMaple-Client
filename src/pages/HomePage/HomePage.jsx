import React, { useEffect, useState } from 'react';
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
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BtnShowMoreProduct, Container, ContainerProduct } from './style.js';

const HomePage = () => {
  const [showMore, setShowMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate()
  const itemsPerPage = 24; // Số sản phẩm trên mỗi trang

  const fetchAllProduct = async ({ queryKey }) => {
    const [, page] = queryKey;
    const res = await ProductService.getAllProduct({ page: page, limit: itemsPerPage })
    console.log('res', res)
    return res
  }
  const { data: products } = useQuery({ queryKey: ['products', currentPage], queryFn: fetchAllProduct })

  // hiển thị danh sách danh mục sản phẩm
  const fetchAllCategory = async () => {
    const res = await CategoryProductService.getAllCategory();
    return res;
  };
  console.log('currentpage', currentPage)
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchAllCategory
  });

  // console.log('Products', products)
  // phân trang
  // Lấy giá trị trang từ URL
  const [searchParams, setSearchParams] = useSearchParams(); // Sử dụng useSearchParams để lấy tham số trang
  useEffect(() => {
    const page = searchParams.get('page') || 1; // Lấy giá trị từ URL hoặc mặc định là trang 1
    setCurrentPage(Number(page));
  }, [searchParams]);

  // Duyệt qua mỗi phần tử và thêm vào mảng JSX
  let wrapperCardComponents = []
  if(!showMore){
    wrapperCardComponents = products?.data?.slice(0,18).map(product => (
      <WrapperCardComponent key={product._id} width="calc(16.66667% - 10px)" product={product} />
    ));
  }else if(showMore){
    wrapperCardComponents = products?.data?.map(product => (
      <WrapperCardComponent key={product._id} width="calc(16.66667% - 10px)" product={product} />
    ));
  }

  const handleShowMore = () => {
    setShowMore(true);
  };

  const handlePageChange = (page) => {
    setSearchParams({ page }); // Cập nhật tham số URL với page
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const handleNavigateCategoryProductPage = (categoryId) => {
    navigate(`/category/${categoryId}`)
  }

  return (
    <Container>
      <Flex justify='flex-start' align='center' style={{ backgroundColor: '#fff' }}>
        {categories?.data.map(category => (
          <TypeProductComponent name={category.name} key={category._id} onClick={() => handleNavigateCategoryProductPage(category._id)} />
        ))}
      </Flex>
      <SliderComponent arrImage={[slide1, slide2, slide3, slide4, slide5]} />
      <ContainerProduct>
        <Flex justify='flex-start' align='flex-start' wrap='wrap' gap={'10px'}>
          {wrapperCardComponents}
        </Flex>
        {!showMore && (
          <BtnShowMoreProduct>
            <ButtonComponent name="Xem thêm" onClick={handleShowMore} />
          </BtnShowMoreProduct>
        )}
        {
          showMore && (
            <Pagination
              current={products?.currentPage || 1} // Sử dụng currentPage từ API
              total={products?.total || 0}          // Sử dụng tổng số sản phẩm từ API
              pageSize={itemsPerPage}
              onChange={handlePageChange}
              style={{ marginTop: '20px', textAlign: 'center' }}
              showSizeChanger={false} // Tắt khả năng thay đổi số sản phẩm trên trang
            />
          )
        }
      </ContainerProduct>
    </Container>
  );
};

export default HomePage;
