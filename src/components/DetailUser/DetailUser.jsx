import React, { useState } from 'react'
import { Avatar, Button, Col, ConfigProvider, DatePicker, Divider, Form, Image, Input, Radio, Row } from 'antd'
import { WrapperContent, WrapperUpload } from './style'
import {
    UserOutlined,UploadOutlined
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

const DetailUser = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    const [value, setValue] = useState();
    const [avatar, setAvatar] = useState(user?.avatar)

    const [form] = Form.useForm()
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

    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
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
                                    <Image src={avatar || user?.avatar} alt="avatar" style={{ width: '105px', height: '105px', borderRadius: '50%', objectFit: 'cover' }} />
                                ) : (<Avatar style={{ width: '105px', height: '105px' }} icon={<UserOutlined />} />)}
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
    )
}

export default DetailUser