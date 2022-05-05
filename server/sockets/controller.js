
// SALA PARA 2 PERSONAS
let contador2 = 0;
let i2 = 0;
let room2 = 'room2-0';

// SALA PARA 3 PERSONAS
let contador3 = 0;
let i3 = 0;
let room3 = 'room3-0';

// SALA PARA 4 PERSONAS
let contador4 = 0;
let i4 = 0;
let room4 = 'room4-0';

const socketController = ( socket ) => {

    console.log( `Usuario con id ${ socket.id } conectado` );


    // UNIRSE A SALA
    socket.on( 'join-room', ( { username, room }, callback ) => {

        // SALA DE 2
        if ( room === 2 ) {

            if ( i2 > 1 ) {

                i2 = 0;    
                contador2++;
                room2 = `room2-${contador2}`;
                socket.join( room2 );
                console.log( `Usuario ${ username } se unio a la sala ${ room2 }` );
                
    
            } else {
                socket.join( room2 );
                console.log( `Usuario ${ username } se unio a la sala ${ room2 }` );
                i2++;
            }

            callback( room2 );

        // SALA DE 3
        } else if ( room === 3 ) {

            if ( i3 > 2 ) {

                i3 = 0;    
                contador3++;
                room3 = `room3-${contador3}`;
                socket.join( room3 );
                console.log( `Usuario ${ username } se unio a la sala ${ room3 }` );
                
    
            } else {
                socket.join( room3 );
                console.log( `Usuario ${ username } se unio a la sala ${ room3 }` );
                i3++;
            }

            callback( room3 );

        // SALA DE 4
        } else {

            if ( i4 > 3 ) {

                i4 = 0;    
                contador4++;
                room4 = `room4-${contador4}`;
                socket.join( room4 );
                console.log( `Usuario ${ username } se unio a la sala ${ room4 }` );
                
    
            } else {
                socket.join( room4 );
                console.log( `Usuario ${ username } se unio a la sala ${ room4 }` );
                i4++;
            }

            callback( room4 );

        }

        

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