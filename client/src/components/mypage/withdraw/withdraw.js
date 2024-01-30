import React, { useEffect, useState } from "react";
import axios from 'axios'; 
import "./withdraw.css";
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { getCookie, removeCookie, setCookie } from "../../../useCookies";
import { API_URL } from "../../config/contansts";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";


function Withdraw(props) {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const userPW = props.pw;

  const handleLogin =()=>{
    // console.log('test',password);
    if (!password) {
      return alert("비밀번호를 입력해주세요")
    }else if(userPW == password){
        if (window.confirm('계정탈퇴를 진행하시겠습니까?')) {
          axios.delete(`${API_URL}/admin/user/${getCookie('login')}`);
          removeCookie('login');
          navigate('/');
        }
    }else{
      return alert("비밀번호를 확인해주세요")
    }
  }


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