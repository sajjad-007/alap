import { getDatabase, ref, onValue,push, set, remove } from "firebase/database";
import React, { useEffect, useState } from 'react'
import CartHeading from '../../../components/utilities/CartHeading';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Alert, Avatar } from '@mui/material';
import CartSubHead from '../../../components/utilities/CartSubHead';
import CartComment from '../../../components/utilities/CartComment';
import { FaSquarePlus } from 'react-icons/fa6';
import { useSelector, useDispatch } from 'react-redux'
import Button from "../../../components/utilities/Button";

const FriendsList = () => {
    const db = getDatabase();
    const data = useSelector(state => state.loginUserData.value)
    const [friendsList,setFriendsList] = useState([])
    // friendsList
    useEffect(()=>{
        const usersRef = ref(db, 'friendsList' );
        onValue(usersRef, (snapshot) => {
          let array = []
          snapshot.forEach( (item) => {
            if (item.val().senderid == data.uid || item.val().receiverid == data.uid) {
                array.push({...item.val(), id: item.key});
                // console.log(item.val().senderid);
            }
          })
          setFriendsList(array);
      });
    },[])
    // console.log(friendsList);
    // UnFriend Btn
    let handleUnfriend = (unfriendInfo) =>{
      console.log(unfriendInfo.id);
      remove(ref(db,'friendsList/' + unfriendInfo.id))
    }

    // handle block btn
    let handleBlockBtn = (blockInfo) =>{
      set(push(ref(db, 'blockedfriend')),{
        // receiver 
        
        //receiver id
        blockkhaiseid : data.uid === blockInfo.receiverid 
          ? blockInfo.senderid
          : blockInfo.receiverid ,
          // receiver name
        blockhaisename : data.uid === blockInfo.receiverid 
          ? blockInfo.sendername
          : blockInfo.receivername ,
          // receiver email
        blockkhaiseemail: data.uid === blockInfo.receiverid 
          ?  blockInfo.senderemail
          :  blockInfo.receiveremail,
        
          //sender

          // sender id
        blockdicheid : data.uid !== blockInfo.senderid 
          ?  blockInfo.receiverid
          : blockInfo.senderid,
          // sender name
        blockdichename : data.uid !== blockInfo.senderid 
          ? blockInfo.receivername
          :  blockInfo.sendername ,
        // sender email
        blockdicheemail : data.uid !== blockInfo.senderid 
          ?  blockInfo.receiveremail
          : blockInfo.senderemail,
      }).then(()=>{
        remove(ref(db,'friendsList/' + blockInfo.id))
      })
      // console.log(blockInfo);
    }
  return (
    <div className='cartList'>
      <div style={{display:'flex',alignItems:'center', justifyContent:'space-between'}}>
        <CartHeading className='carthead' text='friends list'/>
        <BsThreeDotsVertical style={{fontSize:'20px',color:'#5F35F5'}}/>
      </div>
      <div className="cartItembox">
      {friendsList.length > 0
      ?
      friendsList.map((item,index)=>(
        <div key={index} className="cartItemChild"style={{display:'flex', gap:'70px'}} >
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
          <div className="cartChild_second" style={{display:'flex',flexWrap:'wrap',flexDirection:'column',gap:'8px'}}>
            <Button className='btn_style' onClick={()=> handleUnfriend(item)} text='unfriend'/>
            <Button className='btn_style' onClick={()=>handleBlockBtn(item)}  text='block'/>
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

export default FriendsList