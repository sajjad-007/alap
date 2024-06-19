import './cartList.css'
import React, { useEffect, useState } from 'react'
import CartHeading from '../utilities/CartHeading'
import { BsThreeDotsVertical } from "react-icons/bs";
import Avatar from '@mui/material/Avatar';
import CartSubHead from '../utilities/CartSubHead';
import CartComment from '../utilities/CartComment';
import { FaSquarePlus } from "react-icons/fa6";
import { useSelector, useDispatch } from 'react-redux'
import { getDatabase, ref, onValue,push } from "firebase/database";


const CartList = () => {
  const data = useSelector(state => state.loginUserData.value)
  const db = getDatabase();
  const [userList,setUserList] = useState([])
  console.log(data.uid);

  //firebase read operation
  useEffect(()=>{
    const usersRef = ref(db, 'users' );
    onValue(usersRef, (snapshot) => {
      let array = []
      snapshot.forEach( (item) => {
        if (item.key != data.uid) { 
          // data.uid holo je login ache tar uid
          // item.key holo browser er sokol user er unique id
          array.push({...item.val(), id: item.key});
          // item.val()= firebase er value return korbe
          // item.key = firebase er unique id gula always key er modde pabo
        }
      })
      setUserList(array);
  });
  },[])
  console.log(userList);

  return (
    <div className='cartList'>
      <div style={{display:'flex',alignItems:'center', justifyContent:'space-between'}}>
        <CartHeading className='carthead' text='user List'/>
        <BsThreeDotsVertical style={{fontSize:'20px',color:'#5F35F5'}}/>
      </div>
      <div className="cartItembox">
        {userList.map((item,index)=>(
          <div key={index} className="cartItemChild">
            <div className="cartChild_first">
              <div className="first_main" style={{display:'flex', gap:'15px'}}>
                <Avatar
                  alt="Remy Sharp"
                  src="/static/images/avatar/1.jpg"
                  sx={{ width: 50, height: 50 }}
                />
                <div style={{display:"flex", flexDirection:'column', justifyContent:'center'}}>
                  {/* <CartSubHead text={item.fullName}/> */}
                  <div>
                    <h2>{item.fullName}</h2>
                  </div>
                  <CartComment text='Today, 6:pm'/>
                </div>
              </div>
            </div>
            <div className="cartChild_second">
              <FaSquarePlus />
            </div>
          </div>
        ))
        }
      </div>
    </div>
  )
}

export default CartList