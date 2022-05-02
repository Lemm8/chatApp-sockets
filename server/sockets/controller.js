const socketController = ( socket ) => {

    console.log( `Usuario con id ${ socket.id } conectado` );


    // UNIRSE A SALA
    socket.on( 'join-room', ( { username, room } ) => {
        socket.join( room);

        console.log( `Usuario ${ username } se unio a la sala ${ room }` );

    });


    // MANDAR MENSAJE
    socket.on( 'send-msg', ( payload ) => {
        socket.to( payload.room ).emit( 'receive-msg', payload );
    });


    // DESCONECTAR UN USUARIO
    socket.on( 'disconnect', () => {
        console.log( `Usuario con id ${ socket.id } desconectado` )
    });

}

module.exports = {
    socketController
}