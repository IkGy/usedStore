import React, { useEffect, useState } from "react";
import axios from 'axios'; 
import "./withdraw.css";
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { setCookie } from "../../../useCookies";
import { API_URL } from "../../config/contansts";
import Typography from "@mui/material/Typography";


function Withdraw() {
  const [password, setPassword] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_URL}/user/login`, {
        password: password,
      });
      setCookie('login', JSON.stringify(response.data));
      setLoggedIn(true);
      console.log("로그인 성공!:", response.data);
    } catch (error) {
      alert("비밀번호를 확인 해주십시오.");
      console.error("로그인 실패:", error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      alert("당신의 모든 정보와 이용내역이 삭제됩니다. 정말 삭제하시겠습니까?");
    }
  }, [isLoggedIn]);

  return(
    <div>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}  
        >
          <Typography component="h1" variant="h5">
            리셀 마켓 계정 탈퇴
          </Typography>
          <TextField
            margin="normal"
            label="비밀 번호를 입력해주세요."
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            autoComplete="current-password"
          />
          <Button
            onClick={handleLogin}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 10}}
          >
            비밀번호 확인
          </Button>
        </Box>
      </Container>
    </div>
  )
}

export default Withdraw;