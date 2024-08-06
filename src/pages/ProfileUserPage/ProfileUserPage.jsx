import React, { useState } from 'react'
import { WrapperContainer } from '../ProductDetailPage/style'
import { Avatar, Form, Row } from 'antd'
import { ContentMenu, HeaderMenu, WrapperMenu } from './style'
import {
    UserOutlined, AppstoreOutlined, SettingOutlined
} from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import moment from 'moment';
import DetailUser from '../../components/DetailUser/DetailUser'
import AddressUser from '../../components/AddressUser/AddressUser'
// import ReactInputDateMask from 'react-input-date-mask';

const ProfileUserPage = () => {
    const [form] = Form.useForm()
    const user = useSelector((state) => state.user)
    console.log(user)
    useEffect(() => {
        // Set form fields when user state changes
        form.setFieldsValue({
            username: user?.username,
            name: user?.name,
            email: user?.email,
            sex: user?.sex,
            dob: user.dob ? moment(user.dob) : null,
            avatar: user?.avatar
        });
        setAvatar(user?.avatar);
    }, [user, form]);// Add form to the dependency array
    const items = [
        {
            key: 'sub1',
            label: 'Tài khoản của tôi',
            icon: <UserOutlined />,
            children: [
                {
                    key: '1',
                    label: 'Hồ sơ',
                },
                {
                    key: '2',
                    label: 'Ngân hàng',
                },
                {
                    key: '3',
                    label: 'Địa chỉ',
                },
                {
                    key: '4',
                    label: 'Đổi mật khẩu',
                },
            ],
        },
        {
            key: 'sub2',
            label: 'Navigation Two',
            icon: <AppstoreOutlined />,
            children: [
                {
                    key: '5',
                    label: 'Option 5',
                },
                {
                    key: '6',
                    label: 'Option 6',
                },
                {
                    key: 'sub3',
                    label: 'Submenu',
                    children: [
                        {
                            key: '7',
                            label: 'Option 7',
                        },
                        {
                            key: '8',
                            label: 'Option 8',
                        },
                    ],
                },
            ],
        },
        {
            key: 'sub4',
            label: 'Navigation Three',
            icon: <SettingOutlined />,
            children: [
                {
                    key: '9',
                    label: 'Option 9',
                },
                {
                    key: '10',
                    label: 'Option 10',
                },
                {
                    key: '11',
                    label: 'Option 11',
                },
                {
                    key: '12',
                    label: 'Option 12',
                },
            ],
        },
    ];
    const [avatar, setAvatar] = useState(user?.avatar)
    const [selectedKey, setSelectedKey] = useState('1')

    const onClick = (e) => {
        console.log('click ', e);
        setSelectedKey(e.key)
    };

    const renderPage = () => {
        switch (selectedKey) {
            case '1':
                return <DetailUser/>;
            case '3':
                return <AddressUser/>;
            default:
                return <DetailUser/>;
        }
    }
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
                            <span >{user.username}</span>
                        </div>
                    </HeaderMenu>

                    <ContentMenu
                        onClick={onClick}
                        style={{
                            backgroundColor: '#f5f5f5',
                        }}
                        defaultSelectedKeys={[selectedKey]}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                        items={items}
                    />

                </WrapperMenu>
                {renderPage()}
            </Row>
        </WrapperContainer>
    )
}

export default ProfileUserPage