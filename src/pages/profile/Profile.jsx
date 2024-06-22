import React, { useEffect, useState } from 'react'
import {  useParams } from 'react-router-dom';
import './profile.css'
import { Avatar } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'
import { getDatabase, ref, onValue,push, set,remove } from "firebase/database";
import CartSubHead from '../../components/utilities/CartSubHead';

const Profile = () => {
    const { id } = useParams();
    const data = useSelector(state => state.loginUserData.value)
    const db = getDatabase();
    const [profileUser,setProfileUser] = useState([])

    useEffect(()=>{
      const usersRef = ref(db, 'users' );
      onValue(usersRef, (snapshot) => {
        let array = []
        snapshot.forEach( (item) => {
          if (item.key == id) { 
            array.push({...item.val(), id: item.key});
          }
        })
        setProfileUser(array);
    });
    },[])
    // console.log(profileUser);
  return (
    <div style={{marginTop:'30px'}}>
      <div className='profile_mail'>
      </div>
        <div style={{display:'flex',alignItems:'center',gap:'20px'}}>
          <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
            sx={{ width: 120, height: 120 }}
            style={{marginTop:'10px'}}
          />
          <div>
            <CartSubHead className='profile_name' text={profileUser[0]?.fullName}/>
          </div>
        </div>
    </div>
    // <div>profile id : {id}</div>
  )
}

export default Profile