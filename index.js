const express=require('express');
const app=express();

const port=8000;

app.use('/',require('./routes'));// it tells that use this given path router
app.listen(port,function(err)
{
    if(err)
    {   // `` this is interpolation
        console.log(`Error in server running : ${err}`);
    }
    console.log(`Server is running on port : ${port}`);
})