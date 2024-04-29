import React from 'react'
import { WrapperBody, WrapperContent, WrapperHeader,MoreSideForm, MoreText } from './style'
import { Divider, Flex, Form, Image, Input, QRCode, Space } from 'antd'
import { FacebookFilled,GoogleCircleFilled } from '@ant-design/icons';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import Logo from '../../asset/images/Logo2.png'
import Logo1 from '../../asset/images/Logo.png'

const SignInPage = () => {
    const onFinish = (values) => {
    console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    };
    return (
        <>
            <WrapperHeader>
                <Flex align='center'>
                    <a href='/'><Image src={Logo} alt="Logo" preview={false}></Image></a>
                    <span style={{fontSize: '2.2rem', fontWeight: '500'}}>Đăng Nhập</span>
                </Flex>
                <Flex align='center'>
                    <span style={{color: 'red' }}>Bạn cần giúp đỡ?</span>
                </Flex>
            </WrapperHeader>
            <WrapperBody>
                <WrapperContent>
                    <MoreSideForm>
                        <Image src={Logo1} alt="Logo1" preview={false}></Image>
                        <Flex justify='center' align='center'>
                            <MoreText>Nền tảng thương mại điện tử yêu thích ở Đông Nam Á & Đài Loan</MoreText>
                        </Flex>
                    </MoreSideForm>
                    <Form name="basic" style={{width: '40%', background: '#fff',padding: '0 40px', borderRadius:'4px' }} initialValues={{ remember: true,}} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems:'center', padding: '20px 0'}}>
                            <span style={{fontSize: '2rem', fontWeight: '500'}}>Đăng nhập</span>
                            <Space>
                                <QRCode type="svg" value="https://ant.design/" size={80} bordered={false} />
                            </Space>
                        </div>
                        <Form.Item name="username" rules={[{required: true,message: 'Please input your username!',},]}>
                            <Input placeholder="Email/Số điện thoại/ Tên đăng nhập"/>
                        </Form.Item>

                        <Form.Item name="password" rules={[{required: true,message: 'Please input your password!',}, ]}>
                            <Input.Password placeholder='Mật khẩu'/>
                        </Form.Item>

                        <Form.Item>
                            <ButtonComponent name="Đăng nhập" width='100%' htmlType="submit"/>
                        </Form.Item>
                        <div style={{display:'flex', justifyContent: 'space-between', alignItems:'center', marginBottom: '10px'}}>
                            <a href = '/dismiss'>Quên mật khẩu</a>
                            <a href = '/sign-up'>Đăng nhập với SMS</a>
                        </div>
                        <div style={{display: 'flex', justifyContent:'center', alignItems: 'center'}}>
                            <div style={{display: 'flex', justifyContent:'center', alignItems: 'center', width: '40%'}}>
                                <Divider textPaddingInline='2em'/>
                                <span style={{color: 'rgb(207,211,223)', padding:'0 12px'}}>Hoặc</span>
                                <Divider />
                            </div>
                        </div>
                        <Flex justify='space-between' align='center'>
                            <ButtonComponent name="FaceBook" color='#fff' textColor='#000' icon={<FacebookFilled />}></ButtonComponent>
                            <ButtonComponent name="Google" color='#fff' textColor='#000' icon = {<GoogleCircleFilled />}></ButtonComponent>
                        </Flex>
                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '40px 0'}}>
                            <span style={{color: 'rgb(207,211,223)'}}>Bạn mới biết đến Maple? <a href='/sign-up'>Đăng ký</a></span>
                        </div>
                    </Form>
                </WrapperContent>
            </WrapperBody>
        </>
    )
}

export default SignInPage