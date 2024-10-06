import React, { useState } from 'react';
import { WrapperContainer } from '../ProductDetailPage/style';
import { Avatar, Form, Row } from 'antd';
import { ContentMenu, HeaderMenu, WrapperMenu } from './style';
import {
    UserOutlined, AppstoreOutlined
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import moment from 'moment';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const UserPage = () => {
    const [form] = Form.useForm();
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const location = useLocation();

    // Cập nhật form khi user thay đổi
    useEffect(() => {
        form.setFieldsValue({
            username: user?.username,
            name: user?.name,
            email: user?.email,
            sex: user?.sex,
            dob: user.dob ? moment(user.dob) : null,
            avatar: user?.avatar
        });
        setAvatar(user?.avatar);
    }, [user, form]);

    const items = [
        {
            key: 'sub1',
            label: 'Tài khoản của tôi',
            path: '/user/account/profile',
            icon: <UserOutlined />,
            children: [
                {
                    key: '1',
                    label: 'Hồ sơ',
                    path: '/user/account/profile',
                },
                {
                    key: '2',
                    label: 'Ngân hàng',
                },
                {
                    key: '3',
                    label: 'Địa chỉ',
                    path: '/user/account/address',
                },
                {
                    key: '4',
                    label: 'Đổi mật khẩu',
                },
            ],
        },
        {
            key: 'sub2',
            label: 'Đơn mua',
            path: '/user/purchase',
            icon: <AppstoreOutlined />,
        },
    ];

    const [avatar, setAvatar] = useState(user?.avatar);
    const [selectedKey, setSelectedKey] = useState();
    const [openKeys, setOpenKeys] = useState([]);

    useEffect(() => {
        let newSelectedKey;
        let newOpenKey;
        
        // Xác định trạng thái của selectedKey và openKey từ URL
        if (location.pathname === '/user/account/profile') {
            newSelectedKey = '1';
            newOpenKey = 'sub1';
        } else if (location.pathname === '/user/account/address') {
            newSelectedKey = '3';
            newOpenKey = 'sub1';
        } else if (location.pathname === '/user/purchase') {
            newSelectedKey = 'sub2';
            newOpenKey = 'sub2';
        }

        setSelectedKey(newSelectedKey);
        setOpenKeys([newOpenKey]);
    }, [location.pathname]);

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
        <WrapperContainer>
            <Row style={{ width: '100%' }}>
                <WrapperMenu span={4}>
                    <HeaderMenu>
                        <div>
                            {user?.avatar ? (<img src={avatar || user?.avatar} alt="avatar" style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} />) : (
                                <Avatar style={{ width: '50px', height: '50px' }} icon={<UserOutlined />} />
                            )}
                        </div>
                        <div style={{ paddingLeft: '20px' }}>
                            <span>{user.username}</span>
                        </div>
                    </HeaderMenu>

                    <ContentMenu
                        onClick={onClick}
                        style={{
                            backgroundColor: '#f5f5f5',
                        }}
                        selectedKeys={[selectedKey]}
                        openKeys={openKeys} // Quản lý trạng thái mở của các submenu
                        onOpenChange={(keys) => setOpenKeys(keys)} // Cập nhật openKeys khi menu thay đổi
                        mode="inline"
                        items={items}
                    />
                </WrapperMenu>
                <Outlet></Outlet>
            </Row>
        </WrapperContainer>
    );
}

export default UserPage;
