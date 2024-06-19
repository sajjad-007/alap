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
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { ToastContainer, toast } from 'react-toastify';
import { DNA } from 'react-loader-spinner';
import { useNavigate } from "react-router-dom";

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
const emailregx =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/



const Registration = () => {
  const auth = getAuth();
  const db = getDatabase();
  const [loader,setLoader] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      fullName: '',
      password: '',
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .min(2, 'Minimum 2 characters required')
        .required('Kindly enter your full name'),
      password: Yup.string()
        .max(10, 'Must be 10 characters or less')
        .min(4, 'Minimum 5 characters required')
        .required('Kindly enter your password'),
      email: Yup.string()
      .email('Invalid email address')
      .matches(emailregx , 'please check your regx')
      .required('Kindly enter your email'),
    }),
    onSubmit: (values,action) => {
      // console.log(values);
      setLoader(true)
      action.resetForm()
      createUserWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          sendEmailVerification(auth.currentUser)
            .then(() => {
              console.log('email sent ');
              updateProfile(auth.currentUser, {
                displayName: values.fullName, 
              }).then(() => {
                // console.log(userCredential);
                set(ref(db, 'users/' + userCredential.user.uid), {
                  fullName: userCredential.user.displayName,
                  email: userCredential.user.email,
                  profile_picture : userCredential.user.photoURL
                }).then(()=>{
                  // console.log("realtime data created successfully");
                  toast.success('Sign Up successful')
                  setTimeout(() => { 
                    navigate("/")
                  }, 2000);
                });
                setLoader(false)             
              })
            })
        })
        .catch((error) => {
          console.log(error);
          setLoader(false)     
        });
      },
  });
  return (
    <div>
      {loader 
      &&
      <div className='reg_loader'>
        <DNA
          visible={true}
          height="180"
          width="180"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      </div>
      }
      <ToastContainer /> 
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0}>
          <Grid item xs={6} style={{display:'flex', alignItems:'center',justifyContent:'center'}}>
            <div className='log_main' style={{marginTop:'20px', marginBottom:'60px', padding:'20px'}}>
              <LogHead level="h2">
                Get started with easily register
              </LogHead>
              <Pera styling="pera_style" text="Free register and you can enjoy it"/>
              <div className='log_input'>
                <form onSubmit={formik.handleSubmit} style={{display:'flex',  flexDirection:'column',rowGap:'35px',marginTop:"32px"}}>
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
                    {formik.touched.email && formik.errors.email ? (
                        <div style={{color:'red',padding:'5px'}}>{formik.errors.email}</div>
                      ) : null
                    }
                  </div>
                  <div>
                    <InputBox 
                      id="standard-basic2" 
                      label="fullName" 
                      name = 'fullName'
                      type = 'text'
                      onChange = {formik.handleChange}
                      value = {formik.values.fullName}
                      variant="outlined"
                    />
                    {formik.touched.fullName && formik.errors.fullName ? (
                        <div style={{color:'red',padding:'5px'}}>{formik.errors.fullName}</div>
                      ) : null
                    }
                  </div>
                  <div>
                    <InputBox 
                      id="standard-basic3"
                      name = 'password' 
                      label="Password"
                      type='password' 
                      onChange = {formik.handleChange}
                      value = {formik.values.password}
                      variant="outlined"
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div style={{color:'red',padding:'5px'}}>{formik.errors.password}</div>
                      ) : null
                    }
                  </div>
                  <div className="log_btn">
                    <BootstrapButton type='submit' variant="contained" style={{borderRadius:'86px', width:'350px', marginTop:'10px',marginBottom:'30px'}}>
                      Sign Up
                    </BootstrapButton>
                  </div>
                </form>
              </div>
              <span style={{marginTop:'30px'}}>Already have an account ? <Link to='/'>Sign In</Link></span>
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