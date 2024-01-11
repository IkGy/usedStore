import React from "react";
import "./login.css";
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



function Login() {
  return(
    <div>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 20,
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
            label="Email Address"
            name="email"
            required               //반드시 들어가야 할 것
            fullWidth              //전체 화면으로
            autoComplete="email"   //이메일 자동완성
            autoFocus              //페이지 이동시 자동 커서이동
          />
          <TextField 
            margin="normal"
            label="Password" 
            type="password"  
            name="password"
            required
            fullWidth 
            autoComplete="current-password"
          />
          <FormControlLabel 
            control={<Checkbox value="remember" 
            color="primary" />}
            label="비밀번호 저장"
          />
          <Button 
            type="submit"  
            fullWidth 
            variant="contained"
            sx={{ mt: 3, mb: 2}} //margin-top: 3px, margin-bottom: 2px;
          >
            로그인
          </Button>
          <Button 
            Link href="./kakaotalk/kakaotalk"
            fullWidth
            sx={{ 
              mb: 2,
              backgroundColor: "yellow",
              color: "black",
            }}
          >
            카카오톡 계정으로 로그인
          </Button>
          <Grid container>
            <Grid item xs>
              <Link>비밀번호 찾기</Link>
            </Grid>
            <Grid item>
              <Link href="/sign_up">회원가입</Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  )
}

export default Login;