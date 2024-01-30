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
import { API_URL } from "../config/contansts";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_URL}/user/login`, {
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
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

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
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleLogin();
              }
            }}
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
          <Grid container>
            <Grid item xs>
              <Link href="/findpw">비밀번호 찾기</Link>
            </Grid>
            <Grid item>
              <Link href="/sign_up1">회원가입</Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  )
}

export default Login;