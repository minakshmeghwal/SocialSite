// //it is communicate from user side
class ChatEngine{
    constructor(chatBoxId,userEmail)
    {   console.log("email is",userEmail);
        this.chatBox=$(`#${chatBoxId}`);
        this.userEmail=userEmail;
        console.log(userEmail);
        this.socket=io.connect('http://localhost:5000');
        if(this.userEmail)
        {
            this.connectionHandler();
        }
    }//sending a request for connection to socket
    connectionHandler()
    {
        this.socket.on('connect',function()
        {
            console.log('connection established using sockets' );
        })
    }
}