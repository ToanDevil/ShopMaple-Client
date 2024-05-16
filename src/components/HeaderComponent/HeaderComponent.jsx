import React from 'react'
import {Col, Row, Space, Flex, Dropdown, Avatar, Input, Image} from 'antd'
import { UserOutlined, PauseOutlined,FacebookFilled,InstagramFilled,
  QuestionCircleOutlined,BellOutlined
} from '@ant-design/icons';
import { CartIcon, ColLogo, Option, WrapperHeader, TextSign } from './style';
import Logo from '../../asset/images/Logo.png'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const HeaderComponent = () => {
  const items = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          Tài khoản của tôi
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
            Đơn mua
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
          Đăng xuất
        </a>
      ),
      danger: true,
    },
  ];
  const boxStyle = {
    width: '100%',
    padding: '14px 150px 0px 150px',
    display: 'flex',
    alignItems: 'center'
  }
  const { Search } = Input;
  const onSearch = (value, _e, info) => console.log(info?.source, value);

  const navigate = useNavigate();
  const handleNavigateSignIn = () => {
    navigate('/sign-in')
  }
  const handleNavigateSignUp = () =>{
    navigate('/sign-up')
  }
  const user = useSelector((state) => state.user)
  return (
    <WrapperHeader>
        <Row style = {boxStyle}>
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
                    <Space style={{cursor: 'pointer'}}>
                      <Avatar size="small" icon={<UserOutlined />} />
                      {user.username}
                    </Space>
                  </Dropdown>):
                  (<Option>
                    <div onClick={handleNavigateSignIn}><TextSign>Đăng nhập</TextSign></div>
                    <PauseOutlined/>
                    <div onClick={handleNavigateSignUp}><TextSign>Đăng ký</TextSign></div>
                  </Option>)
                } 
              </Flex>
            </Col>
        </Row>
        <Row style = {boxStyle}>
          <ColLogo span={4}>
            <Image src={Logo} alt="Logo" preview={false}></Image>
          </ColLogo>
          <Col span={16}>
            <Search placeholder="Tìm kiếm" onSearch={onSearch} enterButton />
          </Col>
          <Col span={4}>
            <Flex justify='center' align='center'>
              <CartIcon/>
            </Flex>
          </Col>
        </Row>
    </WrapperHeader>
  )
}

export default HeaderComponent