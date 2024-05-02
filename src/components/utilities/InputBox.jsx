import { TextField } from '@mui/material'
import React from 'react'

const InputBox = ({id,label,variant,styling}) => {
  return (
    <TextField id={id} label={label} variant={variant} className={styling} style={{width:"368px"}}/>
  )
}

export default InputBox