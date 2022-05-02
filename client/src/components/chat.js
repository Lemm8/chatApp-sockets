import React, { useState, useEffect } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

// RECIBIR PROP SOCKET
function Chat({ socket, username, room }) {

    const [ currentMsg, setCurrentMsg ] = useState("");
    const [ msgList, setMsgList ] = useState([]);

    const sendMsg = async () => {
        if ( currentMsg !== "" ) {

            const mensaje = {
                room,
                username, 
                msg: currentMsg,
                time: new Date( Date.now() ).getHours() 
                        + ":" + 
                      new Date( Date.now() ).getMinutes()
            };

            await socket.emit( 'send-msg', mensaje );
            setMsgList((list) => [...list, mensaje]);
            setCurrentMsg("");

        }
    }

    useEffect(() => {        
        
        socket.off("receive-msg").on("receive-msg", (data) => {
            setMsgList((list) => [...list, data]);
        });

    }, [socket])
    


  return (
    <div className='chat-window'>
        <div className='chat-header'>
            <p> Live Chat </p>
        </div>
        <div className='chat-body'>
            <ScrollToBottom className='message-container'>
                { msgList.map( ( msgContent ) => {
                    return <div className='message' id={ username === msgContent.username ? "you" : "other" } >
                        <div>
                            <div className='message-content' >
                                <p> { msgContent.msg } </p>
                            </div>
                            <div className='message-meta' >
                                <p id='time'> { msgContent.time } </p>
                                <p id='author'> { msgContent.username === username ? "You" : msgContent.username } </p>
                            </div>
                        </div>
                    </div>
                })}
            </ScrollToBottom>
        </div>
        <div className='chat-footer'>
            <input type="text" placeholder='Escribe aqui...'
            value={ currentMsg }
            onChange={( event ) => {
                setCurrentMsg( event.target.value )
            }} 
            onKeyPress={( event ) => { 
                event.key === 'Enter' && sendMsg(); 
            }}/>
            <button onClick={ sendMsg } >&#9658;</button>
        </div>
    </div>
  )
}

export default Chat