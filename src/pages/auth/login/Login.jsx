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
import { useFormik } from 'formik';
import * as Yup from 'yup';
import loginValidation from '../../../validation/LoginValidation';
import Modal from '@mui/material/Modal';
import { GiExitDoor } from "react-icons/gi";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

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
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
// const emailRegx =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

// const passregx = /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/

const Login = () => {
  
  const auth = getAuth();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);    
  const handleClose = () => setOpen(false);

  const initialValues = {
    email: '',
    password: '',
  }
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema : loginValidation, //LoginValidation.jsx file in validation folder
    
    onSubmit: (values,actions) => {
      console.log(values);
      actions.resetForm()  // actions.resetForm to reset our form
      signInWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          // Signed in 
          console.log(userCredential);
          // ...
        })
        .catch((error) => {
          // const errorCode = error.code;
          // const errorMessage = error.message;
          console.log(error);
        });
    },
  });

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
              <form onSubmit={formik.handleSubmit}>
                <div className='log_input' style={{display:'flex',flexDirection:'column',rowGap:'60px',marginTop:"32px"}}>
                  <div>
                    <InputBox 
                      id="standard-basic" 
                      label="Email Address" 
                      variant="standard" 
                      name='email' 
                      type='email' 
                      onChange={formik.handleChange} 
                      value={formik.values.email} 
                      style={{marginBottom:'30px'}} 
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <p style={{color:'red'}}>{formik.errors.email}</p>
                    ) : null}
                  </div>
                  <div>
                    <InputBox 
                      id="standard-basic2" 
                      name='password' 
                      type='password' 
                      onChange={formik.handleChange} 
                      value={formik.values.password} 
                      label="Password" 
                      variant="standard"
                    />
                      {formik.touched.password && formik.errors.password ? (
                        <p style={{color:'red'}}>{formik.errors.password}</p>
                      ) : null}
                  </div>
                </div>
                <div className="log_btn">
                  <BootstrapButton style={{display:'inline-block'}} type='submit' variant="contained">
                  Login to Continue
                  </BootstrapButton>
                </div>
              </form>
              <span>Don’t have an account ? <Link to='/registration'>Sign up</Link></span>
              <p onClick={handleOpen} style={{marginLeft:"44px",marginTop:"4px",cursor:'pointer'}}>Foget password ?</p>
              <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <h2 style={{textAlign:'center',marginBottom:'18px'}}>Forget your Password</h2>
                <button className='modal_exit' onClick={ () => setOpen(false)}>
                  <GiExitDoor />
                </button>
                <form onSubmit={formik.handleSubmit}>
                  <div>
                      <InputBox 
                        id="standard-basic" 
                        label="Email Address" 
                        variant="outlined" 
                        name='email' 
                        type='email' 
                        onChange={formik.handleChange} 
                        value={formik.values.email} 
                        style={{marginBottom:'30px'}} 
                      />
                  </div>
                  <BootstrapButton type='submit' variant="contained" style={{textAlign:'center',marginLeft:'30px', marginTop:'30px'}} >
                    Submit
                  </BootstrapButton>
                </form>
              </Box>
            </Modal>
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