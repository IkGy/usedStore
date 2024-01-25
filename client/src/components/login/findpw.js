import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Container } from '@mui/material';
import { API_URL } from '../config/contansts';

const FindPW = () => {
  const [real_name, setRealName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleFindPW = async () => {
    try {
      // 클라이언트에서 서버로 이메일 전송
      const response = await axios.post(`${API_URL}/user/findpw`, { email, real_name });

      if (response.status === 200) {
        const newPWFromServer = response.data.newPassword;

        setNewPassword(newPWFromServer);
        alert('새로운 비밀번호 입니다. 로그인후 마이페이지에서 비밀번호를 변경하여 주십시오.');
      } else {
        setMessage('저장된 이메일이 없습니다. 다시 한번 확인해주세요.');
        alert('이메일 및 성명이 일치하지 않습니다. 다시 한번 확인해주세요.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('이메일 및 성명이 일치하지 않습니다. 다시 한번 확인해주세요.');
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 10 }}>
        <Typography component="h1" variant="h5">
          비밀번호 찾기 및 재설정
        </Typography>
      <TextField
        fullWidth
        required 
        label="이메일"
        variant="outlined"
        margin="normal"
        placeholder='로그인시 사용되는 이메일을 입력해주세요'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        fullWidth
        required
        label="성명"
        variant="outlined"
        margin="normal"
        placeholder='회원가입시 등록한 성명을 입력해주세요'
        value={real_name}
        onChange={(e) => setRealName(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleFindPW}>
        비밀번호 찾기
      </Button>
      {message && <Typography color="primary">{message}</Typography>}
      {newPassword && (
        <Typography variant="subtitle1">새로운 비밀번호: {newPassword}</Typography>
      )}  
      </Container>
  );
};


export default FindPW;

