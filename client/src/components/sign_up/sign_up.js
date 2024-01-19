import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { API_URL } from '../config/contansts';
import GoogleLoginButton from "../login/goolge";
import NaverLoginButton from "../login/NaverLoginButton"; 


const defaultTheme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const [selectedAddress, setSelectedAddress] = useState('');
  const [kakaoAccount, setKakaoAccount] = useState(null);
  const [googleInfo, setGoogleInfo] = useState(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = e.target.id.value;
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const address = e.target.address.value;
    const phone_number = e.target.phone_number.value;
    
    const data = {
      id: id,
      name: name,
      email: email,
      password: password,
      address: address,
      phone_number: phone_number
    }; 
    console.log(data);

    await axios.post(`${API_URL}/user/register`, data)
    .then((result) => {
      console.log('result.data: ', result.data);
      navigate("/login");
      }
    ).catch((error) => { 
      console.log(error); 
    });
  };

  const handleAddressClick = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        // 주소 선택 후 state에 저장
        const fullAddress = `${data.address} ${data.buildingName || ''}`;
        setSelectedAddress(fullAddress);
        console.log(data);
      },
    }).open();
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
          <Typography component="h1" variant="h6" sx={{ mt: 2 }}>
            연결할 플랫폼을 선택해주세요.
          </Typography>
          <Typography component="h1" variant="h6" sx={{ mb: 2 }}>
            반드시 하나를 선택하셔야 합니다.
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
          {/* <Button
            fullWidth
            sx={{ 
              mb: 2,
              backgroundColor: "#40FF00",
              color: "black",
            }}
          >
            네이버 계정으로 로그인
          </Button> */}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="id"
                  required // 반드시 작성
                  fullWidth
                  id="id"
                  label="아이디"
                  autoFocus
                  value={kakaoAccount ? kakaoAccount.nickname : ''}
                  onChange={(e) => setKakaoAccount((prev) => ({ ...prev, nickname: e.target.value }))}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="real_name"
                  label="성명"
                  value={(googleInfo && googleInfo.name) || ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="이메일 주소"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={(googleInfo && googleInfo.email) || ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="비밀번호"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="address"
                  label="주소"
                  type="text"
                  id="address"
                  value={selectedAddress}
                  onClick={handleAddressClick}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phone_number"
                  label="전화번호"
                  type="tel"
                  id="phone_number"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              가입하기
            </Button>
            <Grid container justifyContent="flex-end" sx={{mb: 20}}>
              <Grid item>
                <Link href="/login" variant="body2">
                  계정이 이미 있나요?  로그인
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}