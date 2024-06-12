import React from 'react'
import './layout.css'
import Avatar from '@mui/material/Avatar';
import { NavLink } from 'react-router-dom';
import { ImExit } from "react-icons/im";
import { FaHome } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";
import { FaBell } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";






const Sidebar = () => {
  return (
    <div>
      <div className="sidebar_main">
        <div className="sidebar_inner">
          <div className="sidebar_avatar">
            <Avatar
              alt="sajjad"
              src="/static/images/avatar/1.jpg"
              sx={{ width: 50, height: 50 }}
            />
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
          <div className="sidebar_logout">
            <ImExit/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar