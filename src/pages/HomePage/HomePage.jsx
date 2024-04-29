import React, { useState } from 'react';
import './style.css';
import TypeProductComponent from '../../components/TypeProductComponent/TypeProductComponent';
import { Flex, Pagination } from 'antd';
import SliderComponent from '../../components/SliderComponent/SliderComponent';
import slide1 from '../../asset/images/slide1.jpg';
import slide2 from '../../asset/images/slide2.jpg';
import slide3 from '../../asset/images/slide3.jpg';
import slide4 from '../../asset/images/slide4.jpg';
import slide5 from '../../asset/images/slide5.jpg';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { WrapperCardComponent } from '../TypeProductPage/style';

const HomePage = () => {
  const arr = ['Quần áo', 'Giày dép', 'Điện thoại', 'Đồ gia dụng'];
  const [showMore, setShowMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 60; // Số sản phẩm trên mỗi trang

  // Mảng chứa các phần tử JSX của WrapperCardComponent
  let wrapperCardComponents = [];

  // Duyệt qua mỗi phần tử và thêm vào mảng JSX
  const lengthProduct = 121;
  const initialProductCount = showMore ? lengthProduct : 30;
  if(initialProductCount===30){
    for(let i = 0; i<30; i++){
      wrapperCardComponents.push(
        <WrapperCardComponent key={i} width="calc(16.66667% - 10px)" />
      )
    }
  }
  else{
    wrapperCardComponents=[];
    for (let i = (currentPage - 1) * itemsPerPage; i < Math.min(currentPage * itemsPerPage, lengthProduct); i++) {
      wrapperCardComponents.push(
        <WrapperCardComponent key={i} width="calc(16.66667% - 10px)" />
      );
    }
  }

  const handleShowMore = () => {
    setShowMore(true);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  return (
    <div className='container'>
      <Flex justify='flex-start' align='center' className="type__product">
        {arr.map(item => (
          <TypeProductComponent name={item} key={item} />
        ))}
      </Flex>
      <SliderComponent arrImage={[slide1, slide2, slide3, slide4, slide5]} />
      <div className='container__product'>
        <Flex justify='flex-start' align='flex-start' wrap='wrap' gap={'10px'}>
          {wrapperCardComponents}
        </Flex>
        {!showMore && wrapperCardComponents.length < lengthProduct && (
          <div className='btn__showMoreProduct'>
            <ButtonComponent name="Xem thêm" onClick={handleShowMore} />
          </div>
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
      </div>
    </div>
  );
};

export default HomePage;
