import CartHeading from '../../../components/utilities/CartHeading'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { Alert, Avatar } from '@mui/material'
import CartSubHead from '../../../components/utilities/CartSubHead'
import CartComment from '../../../components/utilities/CartComment'
import Button from '../../../components/utilities/Button'
import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue,push, set, remove } from "firebase/database";
import { useSelector, useDispatch } from 'react-redux'
import '../cartList/cartList.css'

const FriendRequest = () => {
  const db = getDatabase();
  const data = useSelector(state => state.loginUserData.value)
  // console.log(data);
  const [friendReq,setFriendReq] = useState([])

  // friend Request firebase read operation
  useEffect(()=>{
    const friendReqRef = ref(db, 'friendRequest' );
    onValue(friendReqRef, (snapshot) => {
      let array = []
      snapshot.forEach( (item) => {
        if (data.uid == item.val().whoreciveid) {
          array.push({...item.val(), id: item.key});
        }  
      })
      setFriendReq(array);
  });
  },[])

  // friend request delete firebase
  let handleDeleteBtn = (deleteInfo) =>{
    // console.log(deleteInfo.id);
    remove(ref(db,'friendRequest/' + deleteInfo.id))
  }
  // friend request accept 
  let handleAccepteBtn = (acceptInfo) =>{
    set(push(ref(db, 'friendsList')),{
      sendername: acceptInfo.whosendName,
      senderemail: acceptInfo.whosendemail,
      senderid: acceptInfo.whosendid,
      receivername: data.displayName,
      receiveremail: data.email,
      receiverid: data.uid,
    }).then(()=>{
      remove(ref(db,'friendRequest/' + acceptInfo.id))
    })
  }
  
  return (
    <div className='cartList'>
    <div style={{display:'flex',alignItems:'center', justifyContent:'space-between'}}>
      <CartHeading className='carthead' text='Friend Request'/>
      <BsThreeDotsVertical style={{fontSize:'20px',color:'#5F35F5'}}/>
    </div>
    <div className="cartItembox">
      
      {friendReq.length > 0
        ?
        friendReq.map((item,index)=>(
          <div key={index} className="cartItemChild"style={{display:'flex', gap:'70px'}} >
            <div className="cartChild_first">
              <div className="first_main" style={{display:'flex', gap:'15px'}}>
                <Avatar
                  alt="Remy Sharp"
                  src="/static/images/avatar/1.jpg"
                  sx={{ width: 50, height: 50 }}
                />
                <div style={{display:"flex", flexDirection:'column', justifyContent:'center'}}>
                  <CartSubHead text={item.whosendName}/>
                  {/* <div>
                    <h2>{item.fullName}</h2>
                  </div> */}
                  <CartComment text='Today, 6:pm'/>
                </div>
              </div>
            </div>
            <div className="cartChild_second" style={{display:'flex',flexWrap:'wrap',flexDirection:'column',gap:'5px'}}>
              <Button className='btn_style' onClick={()=> handleAccepteBtn(item)} text='accept'/>
              <Button className='btn_style' onClick={()=> handleDeleteBtn(item)} text='delete'/>
            </div>
          </div>
        ))

        :

        <Alert severity="info">No friend request found</Alert>
      }
    </div>
    </div>
  )
}

export default FriendRequest