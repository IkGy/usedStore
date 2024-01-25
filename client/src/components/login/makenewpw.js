import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config/contansts';
import { getCookie, removeCookie } from "../../useCookies";
import { Button, TextField, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';


function MakeNewPW() {
  const [currentPW, setCurrentPW] = useState('');
  const [newPW, setNewPW] = useState('');
  const [confirmedPW, setConfirmedPW] = useState('');
  const navigate= useNavigate();

  const CurrentPWChange = (event) => {
    setCurrentPW(event.target.value);
  };
  
  const NewPWChange = (event) => {
    setNewPW(event.target.value);
  };

  const ConfirmedPWChange = (event) => {
    setConfirmedPW(event.target.value);
  };
  
  const logOut = (e) => {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [name] = cookie.split("=");
      removeCookie("name");
    }
    window.localStorage.clear();
    if (getCookie("login")) {
      removeCookie('login');
      window.Kakao.Auth.logout()
        .then(function () {
          alert(
            "logout ok\naccess token -> " + window.Kakao.Auth.getAccessToken()
          );
          deleteCookie();
        })
        .catch(function () {
        });
    }
    alert('비밀번호가 성공적으로 재설정되었습니다. 다시 로그인하여 주십시오');
    navigate("/login");
  };

  const ResetPW = async () => {
    try {
      if (newPW !== confirmedPW) {
        alert('새로운 비밀번호와 비밀번호 확인이 일치하지 않습니다.');
        return;
      }

      const response = await axios.post(`${API_URL}/user/makenewpw`, {
        currentPW: currentPW,
        newPW: newPW,
        id: getCookie("login")
      });

      if (response.status === 200) {
      } else {
        alert('비밀번호 재설정 실패! 입력란을 다시 확인해주세요');
      }
    } catch (error) {
      console.error('서버 통신 오류', error);
    }
  };
  
  const deleteCookie = () => {
    document.cookie =
      "authorize-access-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  };


  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 10 }}>
      <Typography component="h1" variant="h5">
        비밀번호 재설정
      </Typography>
      <TextField
        fullWidth
        required
        label="현재 비밀번호"
        variant="outlined"
        margin="normal"
        type="password"
        value={currentPW}
        onChange={CurrentPWChange}
      />
      <TextField
        fullWidth
        required
        label="새로운 비밀번호"
        variant="outlined"
        margin="normal"
        type="password"
        value={newPW}
        onChange={NewPWChange}
      />
      <TextField
        fullWidth
        required
        label="비밀번호 확인"
        variant="outlined"
        margin="normal"
        type="password"
        value={confirmedPW}
        onChange={ConfirmedPWChange}
      />
      <Button variant="contained" color="primary" onClick={() => {
        ResetPW();
        logOut();
      }}>
        비밀번호 재설정
      </Button>
    </Container>
  );
}

export default MakeNewPW;
