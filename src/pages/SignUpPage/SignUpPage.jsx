import React, { useEffect } from 'react'
import { WrapperBody, WrapperContent, WrapperHeader,MoreSideForm, MoreText } from './style'
import { Divider, Flex, Form, Image, Input } from 'antd'
import { FacebookFilled,GoogleCircleFilled } from '@ant-design/icons';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import Logo from '../../asset/images/Logo2.png'
import Logo1 from '../../asset/images/Logo.png'
import { TextSign } from '../../components/HeaderComponent/style';
import { useNavigate } from 'react-router-dom';
import { useMyMutationHook } from '../../hooks/useMutationHook';
import * as UserService from '../../services/UserService';
import * as message from '../../components/MessageComponent/MessageComponent';
import { WarningText } from '../SignInPage/style';

const SignUpPage = () => {
    const mutation = useMyMutationHook(data => UserService.signUpUser(data))
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

    const navigate = useNavigate()
    const handleNavigateSignIn = () => {
        navigate('/sign-in') 
    }
    const handleNavigateHome = () => {
        navigate('/')
    }
    useEffect(() => {
        if(isSuccess && data.status!=='ERR'){
            message.success('Đăng ký tài khoản thành công!')
            /* eslint-disable */
            console.log('JavaScript debug log');
            console.log('eslint is disabled now');
            handleNavigateSignIn()
        }else if(isWarning){
            message.warning('Đã xảy ra lỗi khi đăng ký tài khoản!')
        }
    }, [isSuccess, isWarning, data])  
    /* eslint-enable */
    return (
        <>
            <WrapperHeader>
                <Flex align='center'>
                <Image src={Logo} alt="Logo" preview={false} onClick={handleNavigateHome}></Image>
                    <span style={{fontSize: '2.2rem', fontWeight: '500'}}>Đăng Ký</span>
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
                            <span style={{fontSize: '2rem', fontWeight: '500'}}>Đăng ký</span>
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
                            <Input placeholder="Số điện thoại"/>
                        </Form.Item>
                        <Form.Item name="password" rules={[{required: true,message: 'Please input your password!',}, ]}>
                            <Input.Password placeholder='Mật khẩu'/>
                        </Form.Item>
                        {data?.status === 'ERR' && <WarningText>*  Số điện thoại đã có tài khoản. <br/> Vui lòng quay về trang đăng nhập!</WarningText>}
                        <Form.Item>
                            <ButtonComponent name="Đăng ký" width='100%' htmlType="submit" />
                        </Form.Item>
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
                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent:'center', width:'100%'}}>
                            <div style={{width: '90%', display: 'flex', flexDirection: 'column'}}>
                                <span style={{textAlign: 'center', fontSize:'1.3rem', paddingTop: '20px'}}>Bằng việc đăng ký, bạn đã đồng ý với Maple về <a href='https://help.shopee.vn/portal/4/article/77243'>Điều khoản dịch vụ</a> & <a href='https://help.shopee.vn/portal/4/article/77244'>Chính sách bảo mật</a></span>
                            </div>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '40px 0'}}>
                            <span style={{color: 'rgb(207,211,223)'}}>Bạn đã có tài khoản? <TextSign onClick={handleNavigateSignIn}>Đăng nhập</TextSign></span>
                        </div>
                    </Form>
                </WrapperContent>
            </WrapperBody>
        </>
    )
}

export default SignUpPage