import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { API_URL } from '../config/contansts';


const defaultTheme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const [selectedAddress, setSelectedAddress] = useState('');
  const [kakaoAccount, setKakaoAccount] = useState(null);
  const [Naver_InfoN, setNaver_InfoN] = useState(''); //name
  const [Naver_InfoE, setNaver_InfoE] = useState(''); //email
  const [userData, setUserData] = useState('');

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

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

  useEffect(() => {
    const storedNaver_InfoN = localStorage.getItem('naver_infoN');

    if (storedNaver_InfoN) {
      const parsedNaver_InfoN = storedNaver_InfoN;
      setNaver_InfoN(parsedNaver_InfoN);
    }
  }, []);

  useEffect(() => {
    const storedNaver_InfoE = localStorage.getItem('naver_infoE');

    if (storedNaver_InfoE) {
      const parsedNaver_InfoE = storedNaver_InfoE;
      setNaver_InfoE(parsedNaver_InfoE);
    }
  }, []);

  useEffect(() => {
    const storedKakaoAccount = localStorage.getItem('kakao_account');

    if (storedKakaoAccount) {
      const parsedKakaoAccount = JSON.parse(storedKakaoAccount);
      setKakaoAccount(parsedKakaoAccount);
    }
  }, []);

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');

    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = e.target.id.value;
    const nickname = e.target.nickname.value;
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const address = e.target.address.value;
    const phone_number = e.target.phone_number.value;

    if (!nickname || !name || !email || !password || !address || !phone_number) {
      alert("모든 항목을 채워주세요.");
      return;
    }

    const existingEmailResponse = await axios.get(`${API_URL}/user/check-email?email=${email}`);
    if (existingEmailResponse.data === true) {
      alert("이미 사용 중인 이메일입니다.");     // 이메일 중복 확인
      return;
    } 

    const existingNicknameResponse = await axios.get(`${API_URL}/user/check-nickname?nickname=${nickname}`);
    if (existingNicknameResponse.data === true) {
      alert("이미 사용 중인 닉네임입니다.");  // 닉네임 중복 확인
      return;
    }
    
    const data = {
      id: id,
      nickname: nickname,
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
            회원가입
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="id"
                  fullWidth
                  id="id"
                  label="아이디 (비워두셔도 됩니다)"
                  value={kakaoAccount ? kakaoAccount.nickname : ''}
                  onChange={(e) => setKakaoAccount((prev) => ({ ...prev, nickname: e.target.value }))}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required  // 반드시 작성
                  fullWidth
                  id="real_name"
                  label="성명"
                  value={userData.name || Naver_InfoN || ''}
                  onChange={(e) => {
                    setUserData((prev) => ({ ...prev, name: e.target.value }));
                    setNaver_InfoN((prev) => ({ ...prev, name: e.target.value }));
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="nickname"
                  required
                  fullWidth
                  id="nickname"
                  label="닉네임"
                  type="text"
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
                  value={userData.email || Naver_InfoE || ''}
                  onChange={(e) => {
                    setUserData((prev) => ({ ...prev, email: e.target.value }));
                    setNaver_InfoE((prev) => ({ ...prev, email: e.target.value }));
                  }}
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
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}