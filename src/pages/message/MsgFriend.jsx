import { getDatabase, ref, onValue,push, set, remove } from "firebase/database";
import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Alert, Avatar } from '@mui/material';
import { FaSquarePlus } from 'react-icons/fa6';
import { useSelector, useDispatch } from 'react-redux'
import CartHeading from "../../components/utilities/CartHeading";
import CartSubHead from "../../components/utilities/CartSubHead";
import CartComment from "../../components/utilities/CartComment";
import Button from "../../components/utilities/Button";
import './message.css'
import { msgUserUpdate } from "../../slice/msgSlice";


const MsgFriend = () => {
    
    const db = getDatabase();
    const data = useSelector(state => state.loginUserData.value)
    const activeChatData = useSelector(state => state.activeUserData.value)
    // console.log(msgactiveData);
    const dispatch = useDispatch()
    const [friendsList,setFriendsList] = useState([])
    // friendsList
    useEffect(()=>{
        const usersRef = ref(db, 'friendsList' );
        onValue(usersRef, (snapshot) => {
          let array = []
          snapshot.forEach( (item) => {
            if (item.val().senderid == data.uid || item.val().receiverid == data.uid) {
                array.push({...item.val(), id: item.key});
            }
          })
          setFriendsList(array);
      });
    },[])

    // chat active user
    let handleMsgChat = (chatInfo) =>{
        dispatch(msgUserUpdate(chatInfo))
        // console.log(chatInfo);
    }

  return (
    <div className='cartList msg'>
      <div style={{display:'flex',alignItems:'center', justifyContent:'space-between'}}>
        <CartHeading className='carthead' text='friends list'/>
        <BsThreeDotsVertical style={{fontSize:'20px',color:'#5F35F5'}}/>
      </div>
      <div className="cartItembox">
      {friendsList.length > 0
      ?
      friendsList.map((item,index)=>(
        <div key={index} className="cartItemChild"style={{display:'flex', gap:'70px',padding:'8px',}} onClick={()=>handleMsgChat(item)}>
          <div className="cartChild_first">
            <div className="first_main" style={{display:'flex', gap:'15px'}}>
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                sx={{ width: 50, height: 50 }}
              />
              <div style={{display:"flex", flexDirection:'column', justifyContent:'center'}}>
                <CartSubHead text = {
                  item.senderid == data.uid 
                  ?
                  item.receivername
                  :
                  item.sendername
                }/>
                <CartComment text='Today, 6:pm'/>
              </div>
            </div>
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

export default MsgFriend