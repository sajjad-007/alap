import React from 'react'
import Images from '../../components/utilities/Images'
import ErrorImg from '/error_img.png'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
      <Images className='error_style'  source={ErrorImg}/>
      <Link style={{position:'absolute',top:'328px', left:"585px",textAlign:'center' ,cursor:'pointer',color:'white',fontWeight:'900'}} to='/'>Go Home</Link>
    </div>
  )
}

export default Error