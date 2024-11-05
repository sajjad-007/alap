import React from 'react'
import { Alert } from '@mui/material';

const Notification = () => {
  return (
    <div style={{paddingTop:'25px' ,display:'flex',flexWrap:'wrap',gap:'25px', }}>
      <Alert severity="info">Comming Soon</Alert>
    </div>
  )
}

export default Notification