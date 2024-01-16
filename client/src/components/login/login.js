import React, { useEffect, useState } from "react";
import axios from 'axios'; 
import "./login.css";
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { setCookie } from "../../useCookies";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8080/login", {
        email: email,
        password: password,
      });
      setCookie('login', JSON.stringify(response.data));
      setLoggedIn(true);
      console.log("로그인 성공!:", response.data);
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.Kakao.init("90b9cec28ae877d95b8c171eabad92f5");
      console.log("Kakao 계정으로 성공적으로 로그인 하였습니다")
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  function KakaoLogin() {
    window.Kakao.Auth.login({
      scope:'profile_nickname',
      success: function(authObj) {
        console.log(authObj);
        window.Kakao.API.request({
          url:'/v2/user/me',
          success: res => {
            const kakao_account = res.kakao_account;
            console.log(kakao_account);
            localStorage.setItem('kakao_account', JSON.stringify(kakao_account.profile));
          }
        })
      }
    });
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return(
    <div>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}  
        >
          <Avatar sx={{ m:1, bgcolor: 'secondary.main'}}> 
            <LockOutlinedIcon/>
          </Avatar>
          <Typography component="h1" variant="h5"> {/* // 크기는h1, 디자인은 h5 */}
            로그인
          </Typography>
          <TextField
            margin="normal"
            label="이메일 주소"
            name="email"
            required               //반드시 들어가야 할 것
            fullWidth              //전체 화면으로
            autoComplete="email"   //이메일 자동완성
            autoFocus
            id="email"
            value={email}    
            onChange={(e) => setEmail(e.target.value)}          //페이지 이동시 자동 커서이동
          />
          <TextField
            margin="normal"
            label="비밀번호" 
            type="password"  
            name="password"
            id="password"  
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth 
            autoComplete="current-password"
          />
          <FormControlLabel 
            control={<Checkbox value="remember" 
            color="primary" />}
            label="비밀번호 저장"
          />
          <Button 
            onClick={handleLogin}
            type="submit"  
            fullWidth 
            variant="contained"
            sx={{ mt: 3, mb: 2}} //margin-top: 3px, margin-bottom: 2px;
          >
            로그인
          </Button>
          <Button
            onClick={KakaoLogin}
            fullWidth
            sx={{ 
              mb: 2,
              backgroundColor: "yellow",
              color: "black",
            }}
          >
            카카오톡 계정으로 로그인
          </Button>
          <Grid container>
            <Grid item xs>
              <Link>비밀번호 찾기</Link>
            </Grid>
            <Grid item>
              <Link href="/sign_up">회원가입</Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  )
}

export default Login;