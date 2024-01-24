import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Container } from '@mui/material';
import { API_URL } from '../config/contansts';

const FindPW = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [password, setPassword] = useState('');

  const handleFindPW = async () => {
    try {
      // 클라이언트에서 서버로 이메일 전송
      const response = await axios.post(`${API_URL}/user/findpw`, { email });

      if (response.status === 200) {
        setPassword(response.data.password);
        alert('저장된 비밀번호입니다. 보안에 주의해 주십시오.');
      } else {
        setMessage('저장된 이메일이 없습니다. 다시 한번 확인해주세요.');
        alert('저장된 이메일이 없습니다. 다시 한번 확인해주세요.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('저장된 이메일이 없습니다. 다시 한번 확인해주세요.');
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 10 }}>
        <Typography component="h1" variant="h5">
          비밀번호 찾기
        </Typography>
      <TextField
        fullWidth
        label="이메일"
        variant="outlined"
        margin="normal"
        placeholder='로그인시 사용되는 이메일을 입력해주세요'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleFindPW}>
        비밀번호 찾기
      </Button>
      {message && <Typography color="primary">{message}</Typography>}
      {password && <Typography variant="subtitle1">비밀번호: {password}</Typography>}
    </Container>
  );
};

export default FindPW;