import React from 'react'
// import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Button, Input, LinearProgress, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FcGoogle } from "react-icons/fc";
import './login.css';
import { Link } from 'react-router-dom';
import ChatImg from "../../../assets/images/chat_log.jpg"
import InputBox from '../../../components/utilities/InputBox';
import Images from '../../../components/utilities/Images';


const LogHead = styled(Typography)({
  fontSize: 34,
  fontWeight: 700,
  color: '#03014C',
});
const BootstrapButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 20,
  padding: '26px 122px',
  lineHeight: 1.5,
  color: '#FFF',
  backgroundColor: '#5F34F5',
  borderRadius:'8px',
  fontWeight:'500',
  marginTop: '64px',
  marginBottom:'44px',
  '&:hover': {
    backgroundColor: '#5F34F5',
    borderColor: 'none',
    boxShadow: 'none',
  },
});

const Login = () => {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0}>
          <Grid item xs={6} style={{display:'flex', alignItems:'center',justifyContent:'center'}}>
            <div className='log_main'>
              <LogHead level="h2">
                Login to your account!
              </LogHead>
              <div className='log_box' style={{height:'62px', width:'220px', display:'flex', alignItems:'center', justifyContent:'center', marginTop:'30px', borderRadius:'9px'}}>
                <Link to="https://www.google.com/">
                  <FcGoogle />
                </Link>
                <p className='log_pera' style={{color: '#03014C', fontSize:"14px", fontWeight:"600", letterSpacing:'.267px'}}>
                  <Link to="https://www.google.com/">Login with Google</Link>
                </p> 
              </div>
              <div className='log_input' style={{display:'flex',flexDirection:'column',rowGap:'60px',marginTop:"32px"}}>
                <InputBox id="standard-basic" label="Email Address" variant="standard" style={{marginBottom:'30px'}} />
                <InputBox id="standard-basic" label="Password" variant="standard"/>
              </div>
              <div className="log_btn">
                <BootstrapButton variant="contained">
                Login to Continue
                </BootstrapButton>
              </div>
              <span>Don’t have an account ? <Link to='/registration'>Sign up</Link></span>
            </div>
          </Grid>
          <Grid item xs={6} >
            <div style={{backgroundColor:"red", width:"100%", height:"100vh"}} className='log_img'>
              <Images source={ChatImg} alt='Not Found'/>
            </div>
          </Grid>
          
        </Grid>
      </Box>
    </div>
  )
}

export default Login