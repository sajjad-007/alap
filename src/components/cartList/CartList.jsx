import React from 'react'
import './cartList.css'
import CartHeading from '../utilities/CartHeading'
import { BsThreeDotsVertical } from "react-icons/bs";
import Avatar from '@mui/material/Avatar';
import CartSubHead from '../utilities/CartSubHead';
import CartComment from '../utilities/CartComment';
import { FaSquarePlus } from "react-icons/fa6";

const CartList = () => {
  return (
    <div className='cartList'>
      <div style={{display:'flex',alignItems:'center', justifyContent:'space-between'}}>
        <CartHeading className='carthead' text='user List'/>
        <BsThreeDotsVertical style={{fontSize:'20px',color:'#5F35F5'}}/>
      </div>
      <div className="cartItembox">
        <div className="cartItemChild">
          <div className="cartChild_first">
            <div className="first_main" style={{display:'flex', gap:'15px'}}>
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                sx={{ width: 50, height: 50 }}
              />
              <div style={{display:"flex", flexDirection:'column', justifyContent:'center'}}>
                <CartSubHead text='Ragav'/>
                <CartComment text='Today, 6:pm'/>
              </div>
            </div>
          </div>
          <div className="cartChild_second">
            <FaSquarePlus />
          </div>
        </div>
        <div className="cartItemChild">
          <div className="cartChild_first">
            <div className="first_main" style={{display:'flex', gap:'15px'}}>
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                sx={{ width: 50, height: 50 }}
              />
              <div style={{display:"flex", flexDirection:'column', justifyContent:'center'}}>
                <CartSubHead text='Ragav'/>
                <CartComment text='Today, 6:pm'/>
              </div>
            </div>
          </div>
          <div className="cartChild_second">
            <FaSquarePlus />
          </div>
        </div>
        <div className="cartItemChild">
          <div className="cartChild_first">
            <div className="first_main" style={{display:'flex', gap:'15px'}}>
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                sx={{ width: 50, height: 50 }}
              />
              <div style={{display:"flex", flexDirection:'column', justifyContent:'center'}}>
                <CartSubHead text='Ragav'/>
                <CartComment text='Today, 6:pm'/>
              </div>
            </div>
          </div>
          <div className="cartChild_second">
            <FaSquarePlus />
          </div>
        </div>
        <div className="cartItemChild">
          <div className="cartChild_first">
            <div className="first_main" style={{display:'flex', gap:'15px'}}>
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                sx={{ width: 50, height: 50 }}
              />
              <div style={{display:"flex", flexDirection:'column', justifyContent:'center'}}>
                <CartSubHead text='Ragav'/>
                <CartComment text='Today, 6:pm'/>
              </div>
            </div>
          </div>
          <div className="cartChild_second">
            <FaSquarePlus />
          </div>
        </div>
        <div className="cartItemChild">
          <div className="cartChild_first">
            <div className="first_main" style={{display:'flex', gap:'15px'}}>
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                sx={{ width: 50, height: 50 }}
              />
              <div style={{display:"flex", flexDirection:'column', justifyContent:'center'}}>
                <CartSubHead text='Ragav'/>
                <CartComment text='Today, 6:pm'/>
              </div>
            </div>
          </div>
          <div className="cartChild_second">
            <FaSquarePlus />
          </div>
        </div>
        <div className="cartItemChild">
          <div className="cartChild_first">
            <div className="first_main" style={{display:'flex', gap:'15px'}}>
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                sx={{ width: 50, height: 50 }}
              />
              <div style={{display:"flex", flexDirection:'column', justifyContent:'center'}}>
                <CartSubHead text='Ragav'/>
                <CartComment text='Today, 6:pm'/>
              </div>
            </div>
          </div>
          <div className="cartChild_second">
            <FaSquarePlus />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartList