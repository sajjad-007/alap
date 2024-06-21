import React from 'react'
import CartList from './cartList/CartList'
import FriendRequest from './friendReq/FriendRequest'
import FriendsList from './friendsList/FriendsList'

const Home = () => {
  return (
    <div style={{paddingTop:'25px' ,display:'flex',flexWrap:'wrap',gap:'25px'}}>
      <div >
        <CartList/>
      </div>
      <div>
        <FriendRequest/>
      </div>
      <div>
        <FriendsList/>
      </div>
    </div>
  )
}

export default Home