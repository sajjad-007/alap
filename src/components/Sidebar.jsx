import React from 'react'
import './layout.css'
import Avatar from '@mui/material/Avatar';
import { NavLink, Navigate } from 'react-router-dom';
import { ImExit } from "react-icons/im";
import { FaHome } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";
import { FaBell } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useSelector, useDispatch } from 'react-redux'
import { loginUser } from '../slice/authSlice';



const Sidebar = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const data = useSelector(state => state.loginUserData.value)
  const dispatch = useDispatch()
  // console.log(data);

  const handleSignOut = () =>{
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate('/')
      localStorage.removeItem("loggedInfo")
      dispatch(loginUser(null))
    }).catch((error) => {
      console.log(error);
    });
  }
  return (
    <div>
      <div className="sidebar_main">
        <div className="sidebar_inner">
          <div className="sidebar_avatar" style={{display:'flex',alignItems:'center',justifyContent:'center' ,flexDirection:"column",textAlign:'center'}}>
            <Avatar
              alt="sajjad"
              src="/static/images/avatar/1.jpg"
              sx={{ width: 50, height: 50 }}
            />
            <p style={{textTransform:'capitalize',padding:'15px 0',color:"white",fontSize:'15px'}}>
              {data 
                ?
                data.displayName
                :
                <p>data none</p>
              }
              </p>
          </div>
          <div className="sidebar_items">
            <ul style={{display:'flex',flexDirection:'column',justifyContent:'center',rowGap:'30px'}}>
              <li>
                <NavLink to='/home'>
                  <FaHome />
                </NavLink>
              </li>
              <li>
                <NavLink to='/message'>
                  <AiFillMessage />
                </NavLink>
              </li>
              <li>
                <NavLink to='/notification'>                   
                  <FaBell />
                </NavLink>
              </li>
              <li>
                <NavLink to='/settings'>
                  <IoMdSettings />
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="sidebar_logout" > 
            <span style={{cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}} onClick={handleSignOut}> 
              <ImExit /> 
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar