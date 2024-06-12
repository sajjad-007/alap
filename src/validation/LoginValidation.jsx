import React from 'react'
import * as Yup from 'yup';

const emailRegx =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

// const passregx = /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/

const loginValidation = Yup.object({
    email: Yup.string()
      .email('Check your email format')
      .matches(emailRegx , 'Check your email regx')
      .required('Please enter your email address'),
    password: Yup.string()
      .min(5 , 'minimum five character required')
      .max(10 , 'minimum ten character')
      .required('Please enter your password')
    //   .matches(passregx , "Password must contain at least 8 characters, one uppercase, one number and one special case character")
    
  })

export default loginValidation