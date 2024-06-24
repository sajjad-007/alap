import { Alert, Avatar, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import InputBox from '../../components/utilities/InputBox'
import { BiLogoTelegram } from "react-icons/bi";
import { getDatabase,onValue,push, ref, set } from 'firebase/database'
import moment from 'moment/moment';
import EmojiPicker from 'emoji-picker-react';
import ScrollToBottom from 'react-scroll-to-bottom';
import { AudioRecorder } from 'react-audio-voice-recorder';
import { getStorage, ref as sref, uploadBytes,getDownloadURL,uploadString  } from "firebase/storage";
import { AiFillLike } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'
import { IoSend } from "react-icons/io5";



const MsgBox = () => {
    const db = getDatabase();
    const data = useSelector(state => state.loginUserData.value)
    const activeChatData = useSelector(state => state.activeUserData.value)
    const [msgText,setMsgText] = useState('')
    const [allMsg,setAllMsg] = useState([])
    const [emojiShow,setEmojiShow] = useState(false)
    const [blob,setBlob] = useState('')
    const [audioUrl,setAudioUrl] = useState('')
    const [voicebox, setVoicebox] = useState(true)
    const storage = getStorage();


    const addAudioElement = (blob) => {
        const url = URL.createObjectURL(blob);
        const audio = document.createElement("audio");
        audio.src = url;
        audio.controls = true;
        setAudioUrl(url);
        setBlob(blob);
        // document.body.appendChild(audio);
    };
    let handleInputBox = (e) =>{
        setMsgText(e.target.value);
    }
    // submit msg firebase write
    let handleMsgSubmit = () =>{
        // console.log(msgText);
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
            emoji : `emoji`,
            date: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getMilliseconds()}`,   
        }).then(()=>{
            setMsgText('')
        })
    }
    // submit msg to chatbox (firebase read)
    useEffect(()=>{
        const usersRef = ref(db, 'message' );
        onValue(usersRef, (snapshot) => {
          let array = []
          snapshot.forEach( (item) => {
            // activeid holo jake click korchi tar idr condition
            let activeid = (data.uid == activeChatData?.senderid) ? (activeChatData?.receiverid) : (activeChatData?.senderid)
            if ((item.val().senderid == data.uid && item.val().receiverid == activeid) || (item.val().receiverid == data.uid && item.val().senderid == activeid )) {
                array.push({...item.val(), id: item.key});
                // console.log(item.val());
            }
          })
          setAllMsg(array);
      });
    },[activeChatData])
    // console.log(allMsg);

    // handle emoji
    let handleEmoji = () =>{
        setEmojiShow(!emojiShow)
    }
    // handle emoji click
    let handleEmojiClick = (e) => {
        setMsgText(msgText + e.emoji);  
    }
    // handle input inside enter
    let handleEnter = (e) =>{
        if (e.key == 'Enter') {
            set(push(ref(db, 'message')),{
                //sender
                senderid : data.uid,
                sendername : data.displayName,
                senderemail : data.email,
                // receiver
                receiverid :
                    ( activeChatData.receiverid == data.uid )
                        ? activeChatData.senderid 
                        : activeChatData.receiverid,
                receivername:
                    ( activeChatData.receiverid == data.uid )
                        ? activeChatData.sendername
                        : activeChatData.receivername,
                receiveremail :
                    ( activeChatData.receiverid == data.uid )
                        ? activeChatData.senderemail
                        : activeChatData.receiveremail,
                // message update        
                message : msgText ,  
                date: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getMilliseconds()}`,   
            })
        }
    }
    //handle audio upload
    let handleAudioUpload = () => {
        const audioStorageRef = sref(storage, 'voice/'+ Date.now());
        uploadBytes(audioStorageRef, blob).then((snapshot) => {
          getDownloadURL(audioStorageRef).then((downloadURL) => {
            set(push(ref(db, "message")), {
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
            audio: downloadURL, 
            date: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getMilliseconds()}`,   
            }).then(() => {
              setAudioUrl("");
            });
          });
        });
    };    
    // handle like btn
    let handleLikeBtn = () =>{
        set(push(ref(db, 'message')),{
                //sender
                senderid : data.uid,
                sendername : data.displayName,
                senderemail : data.email,
                // receiver
                receiverid :
                    ( activeChatData.receiverid == data.uid )
                        ? activeChatData.senderid 
                        : activeChatData.receiverid,
                receivername:
                    ( activeChatData.receiverid == data.uid )
                        ? activeChatData.sendername
                        : activeChatData.receivername,
                receiveremail :
                    ( activeChatData.receiverid == data.uid )
                        ? activeChatData.senderemail
                        : activeChatData.receiveremail,
                // like update        
                like : `&#128077;` ,  
                date: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getMilliseconds()}`,   
            })
    }
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
            <ScrollToBottom className="msg_body">
                {allMsg.map((item,index)=>(
                    (item.senderid == data.uid)
                    ?
                    <div key={index} className="msg_sender">           
                        {item.message
                    
                        ?    
                            <p>{item.message}</p>    
                        :
                            item.audio 
                            ?
                                <audio className='senderaudio' controls src={item.audio}/>
                            :
                                <div className='like_btn' dangerouslySetInnerHTML={{__html: item.like}}></div>
                        }
                        <span>
                            {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                        </span>
                    </div>
                    :
                    <div key={index} className="msg_receiver">
                        {item.message
                        ?    
                            <p>{item.message}</p>                  
                        :
                            item.audio
                            ?    
                                <audio className='receiveraudio' controls src={item.audio}/>
                            :   
                                <div className='like_btn' dangerouslySetInnerHTML={{__html: item.like}}></div>
                        }
                        <span>
                            {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                        </span>
                    </div>
                    ))

                }
            </ScrollToBottom>
            <div className="msg_footer" style={{display:'flex',alignItems:'center',borderRadius:'10px' ,gap:'10px',}}>
                {/* <InputBox onChange={handleInputBox} label='Write something ....' styling='msg_input'/> */}
                <TextField
                    id="outlined-multiline-flexible"
                    multiline
                    maxRows={1}
                    onChange={handleInputBox}
                    className='msg_input'
                    style={{width:'300px',}}
                    value={msgText }
                    onKeyUp={handleEnter}
                />
                {msgText.length > 0  
                    ?
                        <button onClick={handleMsgSubmit}  className='msgBtn'>
                            <BiLogoTelegram />
                        </button>
                    :
                        <button className='msgBtn like' onClick={handleLikeBtn}>
                            <AiFillLike />
                        </button>
                }
                {/* emoji */}
                <div>
                    <button onClick={handleEmoji} style={{padding:'12px' ,borderRadius:'10px',backgroundColor:'#5F35F5',border:'none',color:'white',fontSize:'15px',cursor:'pointer'}}>
                        Emoji
                    </button>
                    <div className='emoji' style={{position:'absolute',left:'300px',bottom:'90px'}}>
                        <span>
                            <EmojiPicker   open={emojiShow} height={450} width={300} onEmojiClick={handleEmojiClick} />
                        </span>
                    </div>
                </div>
                {/* //audio url */}
                <AudioRecorder 
                    onRecordingComplete={addAudioElement}
                    audioTrackConstraints={{
                        noiseSuppression: true,
                        echoCancellation: true,
                    }} 
                    // downloadOnSavePress={true}
                    // downloadFileExtension="webm"
                />
                {audioUrl && (
                      <div className="voice_send_wrapper wrap">
                        <audio controls src={audioUrl} className='audio'></audio>
                        <div className='voice_btn_wrapper'>
                            <button
                              className="voice_btn"
                              onClick={() => setAudioUrl("")}
                            >
                              <MdDelete />
                            </button>
                            <button
                              onClick={handleAudioUpload}
                              className="voice_btn"
                            >
                              <IoSend />
                            </button>
                        </div>
                      </div>
                    )}
            </div>
        </div>
        :
        <Alert severity="info">No user found</Alert>  
        }
    </div>
  )
}

export default MsgBox