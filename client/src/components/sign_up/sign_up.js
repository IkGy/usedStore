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

const defaultTheme = createTheme();

export default function SignUp() {
  const  navigate = useNavigate();
  const [selectedAddress, setSelectedAddress] = useState('');

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const [kakaoAccount, setKakaoAccount] = useState(null);

  useEffect(() => {
    const storedKakaoAccount = localStorage.getItem('kakao_account');
  
    if (storedKakaoAccount) {
      const parsedKakaoAccount = JSON.parse(storedKakaoAccount);
      setKakaoAccount(parsedKakaoAccount);
    }
  }, []);

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

    await axios.post(`${API_URL}/register`, data)
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
          <Typography component="h1" variant="h5" sx={{ mt:5 }}>
            벙개장터에 오신 여러분 환영합니다.
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="id"
                  required
                  fullWidth
                  id="id"
                  label="(카카오 로그인시 아이디를 불러올 수 있습니다) 아이디"
                  autoFocus
                  value={kakaoAccount && kakaoAccount.nickname ? kakaoAccount.nickname : ''}
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
            <Grid container justifyContent="flex-end">
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