import React, { useCallback, useEffect } from 'react'
import { Col, Row, Space, Flex, Dropdown, Avatar, Image, Badge } from 'antd'
import {
  UserOutlined, PauseOutlined, FacebookFilled, InstagramFilled,
  QuestionCircleOutlined, BellOutlined
} from '@ant-design/icons';
import { CartIcon, ColLogo, Option, WrapperHeader, TextSign, Link, CustomSearch } from './style';
import Logo from '../../asset/images/Logo.png'
import { useNavigate } from 'react-router-dom';
import * as UserService from '../../services/UserService';
import { useDispatch, useSelector } from 'react-redux';
import { resetUser } from '../../redux/slices/userSlice';
import * as CartService from '../../services/CartService'
import { updateSizeCart } from '../../redux/slices/cartSlice';

const HeaderComponent = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const user = useSelector((state) => state.user)
  const handleLogOut = useCallback(async () => {
    await UserService.logoutUser();
    dispatch(resetUser());
    localStorage.removeItem('access_token');
    navigate('/');
  }, [dispatch, navigate]);
  const handleNavigateHome = () => {
    navigate('/')
  }
  const handleNavigateSignIn = () => {
    navigate('/sign-in')
  }
  const handleNavigateSignUp = () => {
    navigate('/sign-up')
  }
  const handleNavigateProfile = () => {
    navigate('/user/account/profile')
  }
  const handleNavigatePurchase = () => {
    navigate('/user/purchase')
  }
  const handleNavigateAdminPage = () => {
    navigate('/admin')
  }
  const handleNavigateCartPage = () => {
    if (user.id) {
      navigate('/order')
    } else {
      navigate('/sign-in')
    }
  }
  // console.log('acc', localStorage.getItem('access_token'))
  

  useEffect(() => {
    // console.log(user)
    // if(!user?._id){
    //   handleLogOut()
    // }
    const fetchCartSize = async (userId) => {
      try {
        const res = await CartService.getAllItem(userId);
        const totalItems = res?.data?.length;
        dispatch(updateSizeCart({ number: totalItems }));
      } catch (err) {
        console.error('Error fetching cart size:', err);
      }
    };
    if (user?.id) {
      fetchCartSize(user.id);
    }
  }, [user, dispatch, cart, handleLogOut]);
  

  const items = [
    {
      key: '1',
      label: (
        <span onClick={handleNavigateProfile} style={{ cursor: 'pointer' }}>
          Tài khoản của tôi
        </span>
      ),
    },
    user.isAdmin ? ({
      key: '4',
      label: (
        <span onClick={handleNavigateAdminPage} style={{ cursor: 'pointer' }}>
          Trang quản lý
        </span>
      ),
    }) : null,
    {
      key: '2',
      label: (
        <span onClick={handleNavigatePurchase} style={{ cursor: 'pointer' }}>
          Đơn mua
        </span>
      ),
    },
    {
      key: '3',
      label: (
        <Link onClick={handleLogOut}>
          Đăng xuất
        </Link>
      ),
    },
  ];
  const boxStyle = {
    width: '100%',
    padding: '14px 150px 0px 150px',
    display: 'flex',
    alignItems: 'center'
  }
  const onSearch = (value, _e, info) => console.log(info?.source, value);


  return (
    <WrapperHeader>
      <Row style={boxStyle}>
        <Col span={12}>
          <Space>
            Kênh người bán
            <PauseOutlined />
          </Space>
          <Space>
            Tải ứng dụng
            <PauseOutlined />
          </Space>
          <Space>
            Kết nối
            <FacebookFilled />
            <InstagramFilled />
          </Space>
        </Col>
        <Col span={12}>
          <Flex justify='flex-end' align='flex-start'>
            <Option>
              <BellOutlined />
              Thông báo
            </Option>
            <Option className="header__support">
              <QuestionCircleOutlined />
              Hỗ Trợ
            </Option>
            {user?.username ?
              (<Dropdown
                menu={{
                  items,
                }}
                placement="bottomRight"
                arrow
              >
                <Space style={{ cursor: 'pointer' }}>
                  {user?.avatar ? (<img src={user?.avatar} alt="avatar" style={{ width: '23px', height: '23px', borderRadius: '50%', objectFit: 'cover' }} />) : (
                    <Avatar style={{ width: '23px', height: '23px' }} icon={<UserOutlined />} />
                  )}
                  {user.username}
                </Space>
              </Dropdown>) :
              (<Option>
                <div onClick={handleNavigateSignIn}><TextSign>Đăng nhập</TextSign></div>
                <PauseOutlined />
                <div onClick={handleNavigateSignUp}><TextSign>Đăng ký</TextSign></div>
              </Option>)
            }
          </Flex>
        </Col>
      </Row>
      <Row style={boxStyle}>
        <ColLogo span={4}>
          <Image src={Logo} alt="Logo" preview={false} onClick={handleNavigateHome} style={{ cursor: 'pointer' }}></Image>
        </ColLogo>
        <Col span={16}>
          <CustomSearch placeholder="Tìm kiếm" onSearch={onSearch} enterButton />
        </Col>
        <Col span={4}>
          <Flex justify='center' align='center'>
            {user.id ? (<Badge count={cart.number} overflowCount={10}>
              <CartIcon onClick={handleNavigateCartPage} />
            </Badge>) :
              (<CartIcon onClick={handleNavigateCartPage} />)}
          </Flex>
        </Col>
      </Row>
    </WrapperHeader>
  )
}

export default HeaderComponent