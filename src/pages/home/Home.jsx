import React from 'react'
import CartList from './cartList/CartList'
import FriendRequest from './friendReq/FriendRequest'
import FriendsList from '../home/friendsList/FriendsList'
import BlockFriend from '../home/blockfriend/BlockFriend'



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
      <div>
        <BlockFriend/>
      </div>
    </div>
  )
}

export default Home