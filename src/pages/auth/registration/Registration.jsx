import React, { useState } from 'react' 
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import InputBox from '../../../components/utilities/InputBox';
import Images from '../../../components/utilities/Images';
import Pera from '../../../components/utilities/Pera';
import RegImg from '../../../assets/images/reg_img.jpg';
import './reg.css'




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
const Registration = () => {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0}>
          <Grid item xs={6} style={{display:'flex', alignItems:'center',justifyContent:'center'}}>
            <div className='log_main'>
              <LogHead level="h2">
                Get started with easily register
              </LogHead>
              <Pera styling="pera_style" text="Free register and you can enjoy it"/>
              <div className='log_input' style={{display:'flex',flexDirection:'column',rowGap:'60px',marginTop:"32px"}}>
                <InputBox id="standard-basic" label="Email Address" variant="outlined" />
                <InputBox id="standard-basic" label="Full Name" variant="outlined"/>
                <InputBox id="standard-basic" label="Password" variant="outlined"/>
              </div>
              <div className="log_btn">
                <BootstrapButton variant="contained" style={{borderRadius:'86px', width:'368px'}}>
                  Sign Up
                </BootstrapButton>
              </div>
              <span>Already have an account ? <Link to='/'>Sign In</Link></span>
            </div>
          </Grid>
          <Grid item xs={6} >
            <div style={{backgroundColor:"red", width:"100%", height:"100vh"}} className='reg_img'>
              <Images source={RegImg} alt='Not Found' />
            </div>
          </Grid>
          
        </Grid>
      </Box>
    </div>
  )
}

export default Registration