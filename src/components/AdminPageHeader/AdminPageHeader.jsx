import React from 'react'
import { Flex, Image } from 'antd'
import {
  createFromIconfontCN, HomeFilled
} from '@ant-design/icons';
import Logo from '../../asset/images/Logo.png'
import { useNavigate } from 'react-router-dom';
import * as UserService from '../../services/UserService';
import { useDispatch, useSelector } from 'react-redux';
import { resetUser } from '../../redux/slices/userSlice';
import { WrapperHeader } from '../HeaderComponent/style';
import { Span, WrapperSpace } from './style';

const AdminPageHeader = () => {
    const user = useSelector((state) => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleLogOut = () => {
        UserService.logoutUser()
        dispatch(resetUser())
        localStorage.removeItem('access_token')
        navigate('/sign-in')
    }
    const handleNavigateHome = () => {
        navigate('/')
    }
    const IconFont = createFromIconfontCN({
        scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
    });
    return (
        <div>
            <WrapperHeader style={{height: '60px'}}>
                <Flex justify='space-between' align='center' style={{height: '100%', padding:'0 20px'}}>
                    <Image src={Logo} alt="Logo" preview={false} style={{ height:'100%', width:'200px' }}></Image>
                    <Flex justify='space-between' align='center'>
                        <WrapperSpace justify='space-between' align='center'>
                            <Span>{user?.username}</Span>
                            <img src={user?.avatar} alt="avatar" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                        </WrapperSpace>
                        <WrapperSpace justify='space-between' align='center' style={{cursor: 'pointer'}} onClick={handleNavigateHome}>
                            <HomeFilled />
                            <Span>Thăm Website</Span>
                        </WrapperSpace>
                        <WrapperSpace justify='space-between' align='center' onClick={handleLogOut}>
                            <IconFont type="icon-tuichu" />
                            <Span>Thoát</Span>
                        </WrapperSpace>
                    </Flex>
                </Flex>
            </WrapperHeader>
        </div>
    )
}

export default AdminPageHeader