import React from 'react'
import { WrapperBody, WrapperHeader } from '../SignUpPage/style'
import { Flex, Image } from 'antd'
import { useNavigate } from 'react-router-dom'
import Logo from '../../asset/images/Logo2.png'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import { WrapperContent } from './style'



const OrderSuccessPage = () => {
    const navigate = useNavigate()
    const handleNavigateHome = () => {
        navigate('/')
    }
    return (
        <>
            <WrapperHeader>
                <Flex align='center'>
                <Image src={Logo} alt="Logo" preview={false} onClick={handleNavigateHome}></Image>
                </Flex>
                <Flex align='center'>
                    <span style={{color: 'red' }}>Bạn cần giúp đỡ?</span>
                </Flex>
            </WrapperHeader>
            <WrapperBody>
                <WrapperContent>
                    <h2 style={{color: '#fff'}}>Đặt hàng thành công!</h2>
                    <Flex justify='space-between' align='center' style={{width: '100%'}}>
                        <ButtonComponent name="Trở về" color='rgb(248, 75, 47)' onClick = {() => {navigate('/')}} ></ButtonComponent>
                        <ButtonComponent name="Đơn mua" color='rgb(248, 75, 47)' ></ButtonComponent>
                    </Flex>               
                </WrapperContent>
            </WrapperBody>
        </>
    )
}

export default OrderSuccessPage