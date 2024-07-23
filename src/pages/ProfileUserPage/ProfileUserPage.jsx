import React, { useState } from 'react'
import { WrapperContainer } from '../ProductDetailPage/style'
import { Avatar, Button, Col, ConfigProvider, DatePicker, Divider, Form, Image, Input, Radio, Row } from 'antd'
import { ContentMenu, HeaderMenu, WrapperContent, WrapperMenu, WrapperUpload } from './style'
import {
    UserOutlined, AppstoreOutlined, SettingOutlined,UploadOutlined
} from '@ant-design/icons'
import { useSelector } from 'react-redux'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import * as UserService from '../../services/UserService'
import * as m from '../../components/MessageComponent/MessageComponent'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateUser } from '../../redux/slices/userSlice'
import moment from 'moment';
import { getBase64 } from '../../utils'
// import ReactInputDateMask from 'react-input-date-mask';

const ProfileUserPage = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
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
    const [value, setValue] = useState();
    const [avatar, setAvatar] = useState(user?.avatar)
    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };
    const onClick = (e) => {
        console.log('click ', e);
    };

    const onFinish = async (values) => {
        // console.log('Success:', values);
        const formattedValues = {
            ...values,
            avatar: avatar
        };
        console.log('formattedValues', formattedValues)
        const res = await UserService.updateUser(user.id, formattedValues)
        if (res.status === 'OK') {
            dispatch(updateUser(res.data));
            m.success('Cập nhật thành công!')
            navigate('/profile-user');
        } else {
            console.error('Update failed:', res.message);
        }
        // console.log('res', res)
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const onChangeAvatar = async ({fileList}) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setAvatar(file.preview)
        console.log('avatar: ', avatar)
    }
    return (
        <WrapperContainer>
            <Row style={{ width: '100%' }}>
                <WrapperMenu span={4}>
                    <HeaderMenu>
                        <div>
                            {user?.avatar ? (<img src={avatar || user?.avatar} alt="avatar" style={{width:'50px', height: '50px', borderRadius: '50%', objectFit:'cover'}} />):(
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
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                        items={items}
                    />

                </WrapperMenu>
                <WrapperContent span={20}>
                    <div>
                        <h2>Hồ sơ của tôi</h2>
                        <span>Quản lý thông tin hồ sơ để được bảo mật</span>
                    </div>
                    <Divider></Divider>
                    <ConfigProvider
                        theme={{
                            components: {
                                Radio: {
                                    buttonSolidCheckedActiveBg: 'rgb(34, 193, 195)',
                                    buttonSolidCheckedColor: '#fff',
                                    buttonSolidCheckedHoverBg: 'rgb(34, 193, 195)',
                                },
                            },
                        }}
                    >
                        <Form name="basic" labelCol={{ span: 8, }} wrapperCol={{ span: 16, }} initialValues={{
                            remember: true,
                        }} form={form}
                            onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off" >
                            <Row>
                                <Col span={16}>

                                    <Form.Item name="username" label="Tên đăng nhập">
                                        <Input />
                                    </Form.Item>
                                    <Form.Item name="name" label="Tên">
                                        <Input />
                                    </Form.Item>
                                    <Form.Item name="email" label="Email">
                                        <Input />
                                    </Form.Item>
                                    <Form.Item name="phone" label="Số điện thoại">
                                        <span>{user.phone}</span>
                                    </Form.Item>
                                    <Form.Item name="sex" label="Giới tính">
                                        <Radio.Group onChange={onChange} value={value}>
                                            <Radio value={1}>Nam</Radio>
                                            <Radio value={2}>Nữ</Radio>
                                            <Radio value={3}>Khác</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                    <Form.Item name="dob" label="Ngày tháng năm sinh">
                                        <DatePicker format="DD/MM/YYYY" />
                                    </Form.Item>
                                    <Form.Item wrapperCol={{ offset: 8, span: 16, }}>
                                        <ButtonComponent name="Lưu" width='100px' htmlType="submit" />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '70%' }}>
                                        {avatar || user?.avatar ? (
                                            <Image src={avatar || user?.avatar} alt="avatar" style={{width:'105px', height: '105px', borderRadius: '50%', objectFit:'cover'}} />
                                        ):(<Avatar style={{ width: '105px', height: '105px' }} icon={<UserOutlined />} />)}
                                        <span>{user.email}</span>
                                        <WrapperUpload onChange={onChangeAvatar} maxCount={1}>
                                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                        </WrapperUpload>
                                    </div>
                                </Col>
                            </Row>
                        </Form>
                    </ConfigProvider>
                </WrapperContent>
            </Row>
        </WrapperContainer>
    )
}

export default ProfileUserPage