import { Alert, Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import InputBox from '../../components/utilities/InputBox'
import { BiLogoTelegram } from "react-icons/bi";
import { getDatabase,onValue,push, ref, set } from 'firebase/database'

const MsgBox = () => {
    const db = getDatabase();
    const data = useSelector(state => state.loginUserData.value)
    const activeChatData = useSelector(state => state.activeUserData.value)
    const [msgText,setMsgText] = useState('')
    const [allMsg,setAllMsg] = useState('')

    let handleInputBox = (e) =>{
        setMsgText(e.target.value);
    }
    //submit msg
    let handleMsgSubmit = () =>{
        console.log(msgText);
        set(push(ref(db, 'message')),{
            //sender
            senderid : data.uid,
            sendername : data.displayName,
            senderemail : data.email,
            // receiver
            receiverid :
                (activeChatData.receiverid == data.uid )
                    ? activeChatData.senderid 
                    : activeChatData.receiverid,
            receivername:
                ( activeChatData.receiverid == data.uid )
                    ? activeChatData.sendername
                    : activeChatData.receivername,
            receiveremail :
                (activeChatData.receiverid == data.uid)
                    ? activeChatData.senderemail
                    : activeChatData.receiveremail,
            // message update        
            message : msgText ,     
        })
    }
    // submit msg to chatbox
    useEffect(()=>{
        const usersRef = ref(db, 'message' );
        onValue(usersRef, (snapshot) => {
          let array = []
          snapshot.forEach( (item) => {
            let activeid = (data.uid == activeChatData?.senderid) ? (activeChatData?.receiverid) : (activeChatData?.senderid)
            if ((item.val().senderid == data.uid && item.val().receiverid == activeid) || (item.val().receiverid == data.uid && item.val().senderid == activeid )) {
                array.push({...item.val(), id: item.key});
                // console.log(item.val());
            }
          })
          setAllMsg(array);
      });
    },[activeChatData])
    console.log(allMsg);
    // Check if data and activeChatData are defined
    // if (!data || !activeChatData) {
    //     return <div> loading </div>
    // }
  return (
    <div>
        {activeChatData 
        ?
        <div className='msgbox_main'>
            <div className="msg_head" style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <div className='msghead_item' style={{display:'flex',gap:'10px',alignItems:'center',}}>
                    <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                        sx={{ width: 50, height: 50 }}
                    />
                    <div>
                        <h4>
                            {activeChatData.receiverid == data.uid 
                                ? activeChatData.sendername
                                : activeChatData.receivername
                            }
                        </h4>
                    </div>
                </div>
                <div>
                    <BsThreeDotsVertical style={{fontSize:'20px',color:'#5F35F5',cursor:'pointer'}}/>
                </div>
            </div>
            <div className="msg_body">
                {allMsg.map((item,index)=>(
                    item.senderid == data.uid
                    ?
                    <div key={index} className="msg_sender">
                        <p>{item.message}</p>
                    </div>
                    :
                    <div className="msg_receiver">
                        <p>{item.message}</p>
                    </div>
                ))

                }
            </div>
            <div className="msg_footer" style={{display:'flex',alignItems:'center',borderRadius:'10px' ,gap:'10px',}}>
                <InputBox onChange={handleInputBox} label='Write something ....' styling='msg_input'/>
                {msgText.length > 0  
                    &&
                    <button onClick={handleMsgSubmit} className='msgBtn'>
                        <BiLogoTelegram />
                    </button>
                }
            </div>
        </div>
        :
        <Alert severity="info">No user found</Alert>  
        }
    </div>
  )
}

export default MsgBox