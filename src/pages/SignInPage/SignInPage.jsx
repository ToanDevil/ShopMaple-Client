import React, { useEffect } from 'react'
import { WrapperBody, WrapperContent, WrapperHeader,MoreSideForm, MoreText, WarningText } from './style'
import { Divider, Flex, Form, Image, Input, QRCode, Space } from 'antd'
import { FacebookFilled,GoogleCircleFilled } from '@ant-design/icons'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import Logo from '../../asset/images/Logo2.png'
import Logo1 from '../../asset/images/Logo.png'
import { TextSign } from '../../components/HeaderComponent/style'
import { useLocation, useNavigate } from 'react-router-dom'
import * as UserService from  '../../services/UserService'
import * as message from '../../components/MessageComponent/MessageComponent'
import { useMyMutationHook } from '../../hooks/useMutationHook'
import { jwtDecode } from "jwt-decode";
import { useDispatch } from 'react-redux'
import { updateUser } from '../../redux/slices/userSlice'

const SignInPage = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const mutation = useMyMutationHook(
        data => UserService.loginUser(data)
    )
    console.log("mutation", mutation)
    const onFinish = (values) => {
        mutation.mutate({
            phone: values.phone,
            password: values.password
        })
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const {data, isSuccess, isWarning} = mutation
    /*eslint-disable*/
    useEffect(() => {
        if(isSuccess && data.status !== 'ERR'){
            
            // message.success('Đăng nhập thanh công!')
            localStorage.setItem('access_token', data?.access_token)
            if(data?.access_token){
                const decoded = jwtDecode(data?.access_token)
                console.log('decode', decoded)
                if(decoded?.id){
                    handleGetDetailUser(decoded?.id, data?.access_token)   
                    if(location?.state){
                        navigate(location?.state)
                    }else{
                        navigate('/')
                    }
                }
            }
        }else if(isWarning){
            message.warning('Xảy ra sự cố khi đăng nhập!')
        }
    }, [isSuccess, isWarning, data])
    /*eslint-enable*/
    const handleGetDetailUser = async (id, token) => {
        const res = await UserService.getDetailUser(id, token)
        dispatch(updateUser({...res?.data, access_token: token}))
        console.log('res', res)
    }
    const navigate = useNavigate()
    const handleNavigateSignUp = () => {
        navigate('/sign-up')
    }
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
                    <Form name="basic" style={{width: '40%', background: '#fff',padding: '0 40px', borderRadius:'4px', minHeight: '523px' }} initialValues={{ remember: true,}} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems:'center', padding: '20px 0'}}>
                            <span style={{fontSize: '2rem', fontWeight: '500'}}>Đăng nhập</span>
                            <Space>
                                <QRCode type="svg" value="https://ant.design/" size={80} bordered={false} />
                            </Space>
                        </div>
                        <Form.Item name="phone" rules={[
                            {   required: true,
                                message: 'Please input your phone number!',
                            },
                            {
                                pattern: /^[0-9]{10}$/, // Biểu thức chính quy kiểm tra 10 chữ số
                                message: 'Please enter a valid phone number!',
                            },
                        ]}>
                            <Input placeholder="Email/Số điện thoại/ Tên đăng nhập"/>
                        </Form.Item>

                        <Form.Item name="password" rules={[{required: true,message: 'Please input your password!',}, ]}>
                            <Input.Password placeholder='Mật khẩu'/>
                        </Form.Item>
                        {data?.status === 'ERR' && <WarningText>* {data?.message}</WarningText>}
                        <Form.Item>
                            <ButtonComponent name="Đăng nhập" width='100%' htmlType="submit"/>
                        </Form.Item>
                        <div style={{display:'flex', justifyContent: 'space-between', alignItems:'center', marginBottom: '10px'}}>
                            <a href = '/dismiss'>Quên mật khẩu</a>
                            <a href = '/sign-up'>Đăng nhập với SMS</a>
                        </div>
                        <div style={{display: 'flex', justifyContent:'center', alignItems: 'center'}}>
                            <div style={{display: 'flex', justifyContent:'center', alignItems: 'center', width: '40%'}}>
                                <Divider/>
                                <span style={{color: 'rgb(207,211,223)', padding:'0 12px'}}>Hoặc</span>
                                <Divider />
                            </div>
                        </div>
                        <Flex justify='space-between' align='center'>
                            <ButtonComponent name="FaceBook" color='#fff' textColor='#000' icon={<FacebookFilled />}></ButtonComponent>
                            <ButtonComponent name="Google" color='#fff' textColor='#000' icon = {<GoogleCircleFilled />}></ButtonComponent>
                        </Flex>
                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '40px 0'}}>
                            <span style={{color: 'rgb(207,211,223)'}}>Bạn mới biết đến Maple? <TextSign onClick={handleNavigateSignUp}>Đăng ký</TextSign></span>
                        </div>
                    </Form>
                </WrapperContent>
            </WrapperBody>
        </>
    )
}

export default SignInPage