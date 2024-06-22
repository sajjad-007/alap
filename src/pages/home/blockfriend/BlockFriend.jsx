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

const BlockFriend = () => {
    const db = getDatabase();
    const data = useSelector(state => state.loginUserData.value)
    const [unblockFriend,setUnblockFriend] = useState([])
    // unblock users
    useEffect(()=>{
        const friendReqRef = ref(db, 'blockedfriend' );
        onValue(friendReqRef, (snapshot) => {
          let array = []
          snapshot.forEach( (item) => {
            if ( data.uid === item.val().blockkhaiseid || data.uid === item.val().blockdicheid) {
                array.push({...item.val(), id: item.key});
            }
          })
          setUnblockFriend(array);
      });
      },[])
    //   console.log('fdfsdf',unblockFriend);
    // handle unblock user
    let handleUnblock = (unblockInfo) => {
        remove(ref(db,'blockedfriend/' + unblockInfo.id))
        // console.log(unblockInfo);
    }
  return (
    <div>
        <div className='cartList'>
    <div style={{display:'flex',alignItems:'center', justifyContent:'space-between'}}>
      <CartHeading className='carthead' text='blocked users'/>
      <BsThreeDotsVertical style={{fontSize:'20px',color:'#5F35F5'}}/>
    </div>
    <div className="cartItembox">
      
      {unblockFriend.length > 0
        ?
        unblockFriend.map((item,index)=>(
          <div key={index} className="cartItemChild"style={{display:'flex', gap:'70px'}} >
            <div className="cartChild_first">
              <div className="first_main" style={{display:'flex', gap:'15px'}}>
                <Avatar
                  alt="Remy Sharp"
                  src="/static/images/avatar/1.jpg"
                  sx={{ width: 50, height: 50 }}
                />
                <div style={{display:"flex", flexDirection:'column', justifyContent:'center'}}>
                  <CartSubHead text={
                    item.blockdicheid === data.uid
                    ?
                    item.blockhaisename
                    :
                    item.blockdichename
                  }/>
                  {/* {console.log(item)} */}
                  <CartComment text='Today, 6:pm'/>
                </div>
              </div>
            </div>
            <div className="cartChild_second" style={{display:'flex',flexWrap:'wrap',flexDirection:'column',gap:'5px'}}>
              <Button className='btn_style' onClick={()=>handleUnblock(item)} text='Unblock'/>
            </div>
          </div>
        ))

        :

        <Alert severity="info">No blocked user found</Alert>
      }
    </div>
    </div>
    </div>
  )
}

export default BlockFriend