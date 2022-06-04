const express=require('express');
const app=express();
const cookieParser=require('cookie-parser');

const port=8000;
const db=require('./config/mongoose');
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const MongoStore=require('connect-mongo');
const flash=require('connect-flash');
const customMware=require('./config/middleware');
const passportJWT=require('./config/passport-jwt-strategy');
app.use(express.urlencoded());
app.use(cookieParser());// cookieParser use for cookie
app.use('/uploads',express.static(__dirname+'/uploads'));
//to read from post rquest


app.set('view engine','ejs');// it tells that we would use ejs file
app.set('views','./views'); // it tells that views or ejs file is ./views here


//middleware for encrypt a key
app.use(session({
    name:'codeial',
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:
    {
        maxAge:(1000*60*100)
    }
    ,
    store : MongoStore.create({
        mongoUrl:'mongodb://localhost/Users_db',
        mongooseConnection:db,
        autoRemove:'disabled'
    },
    function(err)
    {
        console.log(err || 'connect-mongodbSetup ok');
    })
    
}));
//this is basically to say use apssport for authentication and this always come after session
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(customMware.setflash);
app.use(passport.setAuthenticatedUser);//it is middleware whenever req is coming this fxn would be called

app.use('/',require('./routes'));// it tells that use this given path router

app.listen(port,function(err)
{
    if(err)
    {   // `` this is interpolation
        console.log(`Error in server running : ${err}`);
    }
    console.log(`Server is running on port : ${port}`);
})