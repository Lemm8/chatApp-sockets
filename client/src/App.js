import './App.css';
import io from 'socket.io-client';
import { useState } from 'react';
import Chat from './components/chat';

// CONECTARSE A SERVIDOR
const socket = io.connect('http://localhost:8080', { transports: ['websocket'] });

function App() {

  const [ username, setUsername ] = useState("");
  const [ room, setRoom ] = useState("");
  const [ showChat, setShowChat ] = useState( false );

  // UNIRSE A SALA
  const joinRoom = () => {
    if ( username !== "" && room !== "" ) {

      // UNIRSE A SALA CON EVENTO join-room
      socket.emit( 'join-room', { username, room } );

      // MOSTRAR CHAT
      setShowChat( true );

    }
  }





  return (
    <div className="App">

    { !showChat ? (

      <div className='joinChatContainer' >

        <h3>Join a Chat</h3>

        {/* CAMBIAR VALOR DE USERNAME AL REALIZAR CAMBIOS EN INPUT */}
        <input type="text" placeholder="Luis..." 
        onChange={( event ) => {
          setUsername( event.target.value )
        }}/>

        {/* CAMBIAR VALOR DE ROOM AL REALIZAR CAMBIOS EN INPUT */}
        <input type="text" placeholder="Room ID..." 
        onChange={( event ) => {
          setRoom( event.target.value )
        }}/>

        <button onClick={ joinRoom }> Join A Room</button>        

      </div> )

      : (        

      <Chat socket={ socket } username={ username } room={ room } />

      )}
    </div>
    
  );
}

export default App;
