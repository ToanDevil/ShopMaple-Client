import { Col, Image, Row } from 'antd';
import React from 'react'
import Slider from 'react-slick';
import './style.css';
import image1 from '../../asset/images/slide-static1.png'
import image2 from '../../asset/images/slide-static2.png'

const SliderComponent = ({arrImage}) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };
    return (
        <div className='slider'>
            <Row>
                <Col span={16}>
                    <Slider {...settings}>
                        {arrImage.map((image) => {
                            return (
                                <Image src={image} alt="slider" preview={false} className="slider__image" ></Image>
                            )
                        })}
                    </Slider>
                </Col>
                <Col span={8}>
                    <Image src={image1} alt="slider" preview={false} className="slider__image slider__static" ></Image>
                    <Image src={image2} alt="slider" preview={false} className="slider__image slider__static slider__static2" ></Image>
                </Col>
            </Row>
        </div>
    )
}

export default SliderComponent