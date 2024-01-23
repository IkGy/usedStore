import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GoogleLoginButton from "../login/goolge";
import NaverLoginButton from "../login/NaverLoginButton"; 


const defaultTheme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const [kakaoAccount, setKakaoAccount] = useState(null);
  const [googleInfo, setGoogleInfo] = useState(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    document.head.appendChild(script);
    script.onload = () => {
      window.Kakao.init("90b9cec28ae877d95b8c171eabad92f5");
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
            setKakaoAccount(kakao_account.profile);
            navigate('/sign_up');
          }
        })
      }
    });
  };

  useEffect(() => {
    const storedKakaoAccount = localStorage.getItem('kakao_account');

    if (storedKakaoAccount) {
      const parsedKakaoAccount = JSON.parse(storedKakaoAccount);
      setKakaoAccount(parsedKakaoAccount);
    }
  }, []);

  const handleGoogleLogin = (info) => {
    setGoogleInfo(info); // Google 로그인 정보 업데이트
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mt: 5 }}>
            리셀마켓에 오신 여러분 환영합니다!
          </Typography>
          <Typography component="h1" variant="h6" sx={{ mt: 2, mb: 3 }}>
            연결할 플랫폼을 선택해주세요.
          </Typography>
          <Button>
            <GoogleLoginButton
              onGoogleLogin={handleGoogleLogin}
              fullWidth
              sx={{ 
                mb: 2,
                backgroundColor: "#A9E2F3",
                color: "black",
              }}
            >
              구글 계정으로 로그인
            </GoogleLoginButton>
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
          <NaverLoginButton/>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/sign_up" variant="body2" sx={{pt: 5}}>
                  계정 연결 건너뛰기
                </Link>
              </Grid>
            </Grid>
            <Grid container justifyContent="flex-end" sx={{mb: 20}}>
              <Grid item>
                <Link href="/login" variant="body2">
                  계정이 이미 있나요?  로그인
                </Link>
              </Grid>
            </Grid>
          </Box>
      </Container>
    </ThemeProvider>
  );
}