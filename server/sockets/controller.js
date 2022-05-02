
let contador = 0;
let i = 0;
let room = 'room0';

const socketController = ( socket ) => {

    console.log( `Usuario con id ${ socket.id } conectado` );


    // UNIRSE A SALA
    socket.on( 'join-room', ( { username } ) => {

        if ( i > 1 ) {

            i = 0;    
            contador = contador + 1;
            room = `room${contador}`;
            socket.join( room );
            console.log( `Usuario ${ username } se unio a la sala ${ room }` );
            

        } else {
            socket.join( room );
            console.log( `Usuario ${ username } se unio a la sala ${ room }` );
            i++;
        }

        // socket.join( room );


        // console.log( `Usuario ${ username } se unio a la sala ${ room }` );

    });


    // MANDAR MENSAJE
    socket.on( 'send-msg', ( payload ) => {
        socket.to( room ).emit( 'receive-msg', payload );
    });


    // DESCONECTAR UN USUARIO
    socket.on( 'disconnect', () => {
        console.log( `Usuario con id ${ socket.id } desconectado` )
    });

}

module.exports = {
    socketController
}