import React from 'react'
import CartList from './cartList/CartList'
import FriendRequest from './friendReq/FriendRequest'

const Home = () => {
  return (
    <div style={{paddingTop:'25px' ,display:'flex',flexWrap:'wrap',gap:'25px'}}>
      <div >
        <CartList/>
      </div>
      <div>
        <FriendRequest/>
      </div>
    </div>
  )
}

export default Home