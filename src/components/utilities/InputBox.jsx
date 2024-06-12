import { TextField } from '@mui/material'
import React from 'react'

const InputBox = ({id,label,variant,styling,name,type,onChange,value}) => {
  return (
    <TextField name={name} type={type} onChange={onChange} value={value} id={id} label={label} variant={variant} className={styling} style={{width:"368px"}}/>
  )
}

export default InputBox