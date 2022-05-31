const express=require('express');
const app=express();
const cookieParser=require('cookie-parser');

const port=8000;


app.use('/',require('./routes'));// it tells that use this given path router
app.use(express.urlencoded);//to read from post rquest

app.use(cookieParser);// cookieParser use for cookie
app.set('view engine','ejs');// it tells that we would use ejs file
app.set('views','./views'); // it tells that views or ejs file is ./views here
app.listen(port,function(err)
{
    if(err)
    {   // `` this is interpolation
        console.log(`Error in server running : ${err}`);
    }
    console.log(`Server is running on port : ${port}`);
})