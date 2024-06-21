import './cartList.css'
import React, { useEffect, useState } from 'react'
import CartHeading from '../../../components/utilities/CartHeading'
import { BsThreeDotsVertical } from "react-icons/bs";
import Avatar from '@mui/material/Avatar';
import CartSubHead from '../../../components/utilities/CartSubHead';
import CartComment from '../../../components/utilities/CartComment';
import { FaSquarePlus } from "react-icons/fa6";
import { useSelector, useDispatch } from 'react-redux'
import { getDatabase, ref, onValue,push, set } from "firebase/database";
import { Alert } from '@mui/material';


const CartList = () => {
  const data = useSelector(state => state.loginUserData.value)
  const db = getDatabase();
  const [friendReqList,setFriendReqList] = useState([])
  const [userList,setUserList] = useState([])
  const [friendBtn,setFriendBtn] = useState([])
  // friend request send
  let handleFriendReq = (item) => {
    // console.log(item);
    set(push(ref(db, 'friendRequest')),{
      whoreciveid : item.id,
      whoreciveemail : item.email,
      whoreciveName : item.fullName,
      whosendid : data.uid,
      whosendemail : data.email,
      whosendName : data.displayName,
    }).then(()=> {
      // console.log('friend request done');
    })
  }
  //firebase read operation userList
  
  useEffect(()=>{
    const usersRef = ref(db, 'users' );
    onValue(usersRef, (snapshot) => {
      let array = []
      snapshot.forEach( (item) => {
        if (item.key != data.uid) { 
          // data.uid holo je login ache tar uid
          // item.key holo browser er sokol user er unique id
          
          // ultimetly = users er id (item.key) shathe judi je login ache tar id (data.uid) name mile tahole login id chara baki users id gulo user list a push hoye jabe
          array.push({...item.val(), id: item.key});
          // item.val()= firebase er value return korbe
          // item.key = firebase er unique id gula always key er modde pabo
        }
      })
      setUserList(array);
  });
  },[])

  //friends request list
  useEffect(() => {
    const usersRef = ref(db, 'friendRequest' );
    onValue(usersRef, (snapshot) => {
      let array = []
      snapshot.forEach( (item) => {
        if (data.uid == item.val().whosendid || data.uid == item.val().whoreciveid) { 
          // je login ache (data.uid) and je friend request send korse (whosendid) tader id judi ek hoy tahole array er modde push hobe sender id and reciver id .
          array.push(item.val().whosendid + item.val().whoreciveid);
        }
      })
      setFriendReqList(array);
  });
  },[])

  // friend btn
  useEffect(() => {
    const usersRef = ref(db, 'friendsList' );
    onValue(usersRef, (snapshot) => {
      let array = []
      snapshot.forEach( (item) => {
        if (data.uid == item.val().senderid || data.uid == item.val().receiverid) { 
          array.push(item.val().senderid + item.val().receiverid);
        }
      })
      setFriendBtn(array);
  });
  },[])
  console.log(friendBtn);

  return (
    <div className='cartList'>
      <div style={{display:'flex',alignItems:'center', justifyContent:'space-between'}}>
        <CartHeading className='carthead' text='user List'/>
        <BsThreeDotsVertical style={{fontSize:'20px',color:'#5F35F5'}}/>
      </div>
      <div className="cartItembox">
        {userList.length > 0 
        ?
        userList.map((item,index)=>(
          <div key={index} className="cartItemChild">
            <div className="cartChild_first">
              <div className="first_main" style={{display:'flex', gap:'15px'}}>
                <Avatar
                  alt="Remy Sharp"
                  src="/static/images/avatar/1.jpg"
                  sx={{ width: 50, height: 50 }}
                />
                <div style={{display:"flex", flexDirection:'column', justifyContent:'center'}}>
                  <CartSubHead text={item.fullName}/>
                  <CartComment text='Today, 6:pm'/>
                </div>
              </div>
            </div>
            <div className="cartChild_second">
            {/* includes() function er kaj holo search kora, eti ekti string er modde tar value search korbe */}
              {friendReqList.includes(data.uid + item.id) || friendReqList.includes(item.id + data.uid)
                ?
                <button className='btn_style'>Cancle</button>
                // ekhon friend request pathle add button change hoye cancle button show korbe
                :
                  friendBtn.includes(data.uid + item.id) || friendBtn.includes(item.id + data.uid)
                  ?
                  <button className='btn_style'>friend</button>
                  :
                  <FaSquarePlus onClick={()=>handleFriendReq(item)}/>
              }
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

export default CartList