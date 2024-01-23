import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import React from 'react';
import { API_URL } from "../config/contansts";


const GoogleLoginButton = ({ onGoogleLogin }) => {
    const navigate = useNavigate();
    const clientId = '1000266403707-ubaiak9k931jdf7g4io02as52nueno6a.apps.googleusercontent.com'

    const decodeToken = async (token) => {
        try {
            const res = await axios.post(`${API_URL}/jwt`, {token});
            const googleInfo = {
                email: res.data.email,
                name: res.data.name,
            };
            localStorage.setItem('userData', JSON.stringify(googleInfo));

            onGoogleLogin(googleInfo);
        }   catch (error) {
            console.error("Error decoding token:", error);
        }
    }

    return (
        <>
            <GoogleOAuthProvider clientId={clientId}>
                <GoogleLogin
                    onSuccess={(res) => {
                        console.log(res,"구글 로그인 성공");
                        decodeToken(res.credential);
                        navigate('/sign_up');
                        }
                    }
                    onFailure={(err) => {
                        console.log(err, "구글 로그인 실패");
                    }}
                />
            </GoogleOAuthProvider>
        </>
    );
};

export default GoogleLoginButton;