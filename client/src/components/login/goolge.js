import {GoogleLogin, GoogleOAuthProvider} from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config/contansts";
    
const GoogleLoginButton = () => {
    const clientId = '1000266403707-ubaiak9k931jdf7g4io02as52nueno6a.apps.googleusercontent.com'
    const navigate = useNavigate();

    const decodeToken = async (token) => {
      const res = await axios.post(`${API_URL}/jwt`, {token});
      console.log("사용자 정보: ", res.data);
    }

    return (
        <>
            <GoogleOAuthProvider clientId={clientId}>
                <GoogleLogin
                
                    onSuccess={(res) => {
                        console.log(res,"구글로그인 성공");
                        decodeToken(res.credential);
                        navigate("/");
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