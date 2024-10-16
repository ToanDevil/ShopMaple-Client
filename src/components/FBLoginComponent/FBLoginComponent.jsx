import React from 'react'
import { FacebookFilled } from "@ant-design/icons";
import * as UserService from "../../services/UserService";
import ButtonComponent from '../ButtonComponent/ButtonComponent';

const FBLoginComponent = () => {
    const responseFacebook = (response) => {
        console.log("Facebook response:", response); // Ghi lại phản hồi
        if (response.status !== "unknown" && response.authResponse) {
            const { accessToken } = response.authResponse; // Truy cập accessToken từ authResponse
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
        } catch (error) {
            console.error("Login failed:", error);
        }
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

export default FBLoginComponent