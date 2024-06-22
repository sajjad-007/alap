import React from 'react'
import MsgFriend from './MsgFriend'
import MsgBox from './MsgBox'

const Message = () => {
  return (
    <div style={{marginTop:'30px',display:'flex',gap:'20px'}}>
      <div>
        <MsgFriend/>
      </div>
      <div>
        <MsgBox/>
      </div>
    </div>
  )
}

export default Message