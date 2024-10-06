import React, { useEffect, useState } from 'react'
import AdminPageHeader from '../../components/AdminPageHeader/AdminPageHeader'

import {
  UserOutlined, AppstoreOutlined, ProductOutlined, ShoppingOutlined
} from '@ant-design/icons'
import { Col, Row } from 'antd'
import { ContentMenu } from './style'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

const AdminPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const items = [
    {
      key: 'sub1',
      label: 'Quản lý người dùng',
      icon: <UserOutlined />,
      path: '/admin/account-management'
    },
    {
      key: 'sub2',
      label: 'Quản lý danh mục',
      icon: <AppstoreOutlined />,
      path: '/admin/category-management'
    },
    {
      key: 'sub3',
      label: 'Quản lý sản phẩm',
      icon: <ProductOutlined />,
      path: '/admin/product-management'
    },
    {
      key: 'sub4',
      label: 'Quản lý đơn hàng',
      icon: <ShoppingOutlined />,
      path: '/admin/purchase-management'
    },
  ];
  const [selectedKey, setSelectedKey] = useState('')
  const [openKeys, setOpenKeys] = useState([]);


  useEffect(() => {
    let newSelectedKey;
    let newOpenKey;

    // Xác định trạng thái của selectedKey và openKey từ URL
    if (location.pathname === '/admin/account-management' || location.pathname === '/admin') {
      navigate('/admin/account-management')
      newSelectedKey = 'sub1';
      newOpenKey = 'sub1';
    } else if (location.pathname === '/admin/category-management') {
      newSelectedKey = 'sub2';
      newOpenKey = 'sub2';
    } else if (location.pathname === '/admin/product-management') {
      newSelectedKey = 'sub3';
      newOpenKey = 'sub3';
    } else if (location.pathname === '/admin/purchase-management') {
      newSelectedKey = 'sub4';
      newOpenKey = 'sub4';
    }

    setSelectedKey(newSelectedKey);
    setOpenKeys([newOpenKey]);
  }, [location.pathname, navigate]);


  const onClick = (e) => {
    const item = items
      .flatMap(group => group.children || group)
      .find(child => child.key === e.key);

    if (item && item.path) {
      setSelectedKey(e.key);
      navigate(item.path);
    }
  };
  return (
    <div>
      <AdminPageHeader></AdminPageHeader>
      <Row style={{paddingTop: '60px'}}>
        <Col span={4}>
          <div style={{position: 'fixed', width: '15%'}}>
            <ContentMenu
              onClick={onClick}
              mode="inline"
              selectedKeys={[selectedKey]}
              openKeys={openKeys} // Quản lý trạng thái mở của các submenu
              onOpenChange={(keys) => setOpenKeys(keys)} // Cập nhật openKeys khi menu thay đổi
              items={items}
            />
          </div>
        </Col>
        <Col span={20}>
          <Outlet></Outlet>
        </Col>
      </Row>
    </div>
  )
}

export default AdminPage