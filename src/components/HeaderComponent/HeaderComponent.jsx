import React from 'react'
import {Col, Row, Space, Flex, Dropdown, Avatar, Input, Image} from 'antd'
import { UserOutlined, PauseOutlined,FacebookFilled,InstagramFilled,
  QuestionCircleOutlined,BellOutlined
} from '@ant-design/icons';
import { CartIcon, Col4__Logo, Option, WrapperHeader } from './style';
import Logo from '../../asset/images/Logo.png'

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
                {/* <Dropdown
                  menu={{
                    items,
                  }}
                  placement="bottomRight"
                  arrow
                >
                  <Space>
                    <Avatar size="small" icon={<UserOutlined />} />
                    Nguyễn Công Toàn
                  </Space>
                </Dropdown> */}
                <Option>
                  <a href='/sign-in'>Đăng nhập</a>
                  <PauseOutlined/>
                  <a href='/sign-up'>Đăng ký</a>
                </Option>  
              </Flex>
            </Col>
        </Row>
        <Row style = {boxStyle}>
          <Col4__Logo span={4}>
            <Image src={Logo} alt="Logo" preview={false}></Image>
          </Col4__Logo>
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