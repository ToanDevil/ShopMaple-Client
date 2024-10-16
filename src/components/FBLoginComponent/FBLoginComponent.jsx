import React, { useEffect, useState } from 'react';
import { FacebookFilled } from "@ant-design/icons";
import * as UserService from "../../services/UserService";
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import { jwtDecode } from "jwt-decode";
import { useLocation, useNavigate } from 'react-router-dom'; 
import { message } from 'antd'; 
import { useDispatch } from 'react-redux';
import { updateUser } from '../../redux/slices/userSlice'

const FBLoginComponent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [data, setData] = useState()
    const location = useLocation()

    const responseFacebook = (response) => {
        console.log("Facebook response:", response); // Log Facebook response
        if (response.status !== "unknown" && response.authResponse) {
            const { accessToken } = response.authResponse; // Access token from authResponse
            console.log("Facebook Access Token:", accessToken);
            handleFacebookLogin(accessToken);
        } else {
            console.error("User canceled login or did not fully authorize.");
        }
    };

    const handleFacebookLogin = async (accessToken) => {
        try {
            const res = await UserService.loginFacebook(accessToken);
            console.log("Login response:", res);
            if(res){
                setData(res)
            }
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    useEffect(() => {
        if (data?.status !== 'ERR') {
            localStorage.setItem('access_token', data?.access_token);
            console.log("data", data)
            if (data?.access_token) {
                const decoded = jwtDecode(data?.access_token);
                console.log('Decoded token:', decoded);
                if (decoded?.id) {
                    handleGetDetailUser(decoded?.id, data?.access_token);
                    if (location?.state) {
                        navigate(location.state);
                    } else {
                        navigate('/');
                    }
                }
            }
        } else {
            message.warning('Xảy ra sự cố khi đăng nhập!');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    const handleGetDetailUser = async (id, token) => {
        const res = await UserService.getDetailUser(id, token);
        dispatch(updateUser({ ...res?.data, access_token: token }));
        
        console.log('User details response:', res);
    };

    const initiateFacebookLogin = () => {
        window.FB.login(responseFacebook, { scope: "public_profile,email" });
    };

    return (
        <ButtonComponent
            icon={<FacebookFilled />}
            onClick={initiateFacebookLogin}
            name="Facebook"
            color='#fff'
            textColor='#000'
        />
    );
};

export default FBLoginComponent;
