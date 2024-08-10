import React, { useState } from 'react'
import AdminPageHeader from '../../components/AdminPageHeader/AdminPageHeader'

import {
  UserOutlined, AppstoreOutlined, SettingOutlined
} from '@ant-design/icons'
import { Col, Row } from 'antd'
import { ContentMenu } from './style'
import AdminPageListUser from '../../components/AdminPageListUser/AdminPageListUser'
import AdminPageProduct from '../../components/AdminPageProduct/AdminPageProduct'
import AdminPageCategory from '../../components/AdminPageCategory/AdminPageCategory'

const AdminPage = () => {
  const items = [
    {
      key: 'sub1',
      label: 'Quản lý người dùng',
      icon: <UserOutlined />,
    },
    {
      key: 'sub2',
      label: 'Quản lý danh mục',
      icon: <AppstoreOutlined />,
    },
    {
      key: 'sub3',
      label: 'Quản lý sản phẩm',
      icon: <SettingOutlined />,
    },
  ];
  const [selectedKey, setSelectedKey] = useState('sub1')
  const onClick = (e) => {
    console.log('click ', e);
    setSelectedKey(e.key)
  };
  const renderPage = () => {
    switch (selectedKey) {
      case 'sub1':
        return <AdminPageListUser />;
      case 'sub2':
        return <AdminPageCategory />;
      case 'sub3':
        return <AdminPageProduct />;
      default: 
        return <AdminPageListUser />;
    }
  }
  return (
    <div>
      <AdminPageHeader></AdminPageHeader>
      <Row>
        <Col span={4}>
          <ContentMenu
            onClick={onClick}
            defaultSelectedKeys={[selectedKey]}
            mode="inline"
            items={items}
          />
        </Col>
        <Col span={20}>
          {renderPage()}
        </Col>
      </Row>
    </div>
  )
}

export default AdminPage