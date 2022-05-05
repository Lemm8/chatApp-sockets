import './App.css';
import io from 'socket.io-client';
import { useState } from 'react';
import Chat from './components/chat';

// CONECTARSE A SERVIDOR
const socket = io.connect('http://localhost:8080', { transports: ['websocket'] });

function App() {

  const [ username, setUsername ] = useState("");
  const [ room, setRoom ] = useState(0);
  const [ showChat, setShowChat ] = useState( false );

  // UNIRSE A SALA
  const joinRoom = ( room ) => {
    if ( username !== "" ) {
      setRoom( room );
      // UNIRSE A SALA CON EVENTO join-room
      socket.emit( 'join-room', { username, room }, ( response ) => {
        setRoom( response );
      });

      // MOSTRAR CHAT
      setShowChat( true );

    }
  }





  return (
    <div className="App">

    { !showChat ? (

      <div className='joinChatContainer' >

        <h3>Random Chat</h3>
        <p> Entra a una sala al azar y habla con personas </p>

        {/* CAMBIAR VALOR DE USERNAME AL REALIZAR CAMBIOS EN INPUT */}
        <input type="text" placeholder="Nombre de Usuario" 
        onChange={( event ) => {
          setUsername( event.target.value )
        }}/>

        {/* CAMBIAR VALOR DE ROOM AL REALIZAR CAMBIOS EN INPUT
        <input type="text" placeholder="Room ID..." 
        onChange={( event ) => {
          setRoom( event.target.value )
        }}/> */}

        <button onClick={ () => joinRoom( 2 ) }> Unirse a una sala de 2</button>        
        <button onClick={ () => joinRoom( 3 ) }> Unirse a una sala de 3</button>        
        <button onClick={ () => joinRoom( 4 ) }> Unirse a una sala de 4</button>        

      </div> )

      : (        

      <Chat socket={ socket } username={ username } room={ room } />

      )}
    </div>
    
  );
}

export default App;
