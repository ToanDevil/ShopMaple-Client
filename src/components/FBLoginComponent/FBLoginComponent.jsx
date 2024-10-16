import React from 'react'
import { FacebookFilled } from "@ant-design/icons";
import * as UserService from "../../services/UserService";
import ButtonComponent from '../ButtonComponent/ButtonComponent';

const FBLoginComponent = () => {
    const responseFacebook = (response) => {
        if (response.status !== "unknown") {
            const { accessToken } = response;
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