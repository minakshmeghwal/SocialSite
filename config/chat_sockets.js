//it is chat socket or server 
module.exports.chatSockets=function(socketServer)
{
    
    //this is important line
    let io = require("socket.io")(socketServer, {
    cors: {
      origin: "http://localhost:8000",
      methods: ["GET", "POST"]
    }
  });
  //let io=require('socket.io')(socketServer);
      //console.log("hey",socketServer);
      //io.set('origins', 'http://localhost:80');
    io.sockets.on('connection',function(socket){
        console.log('new connection received',socket.id);

    })

}