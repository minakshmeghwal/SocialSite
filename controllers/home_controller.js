const post=require('../models/post');
const User=require('../models/user');
// through this it can access this method outside the file
module.exports.home= async function(req,res) // async shows this is asychronas function
{   //console.log(req.cookie);


    // post.find({},function(err,posts)
    // {
    //     return res.render('home',{
    //         title:"Home",
    //         posts:posts
    //     });
    // })

    //changing in code of above
try{
    
    // await shows wait untill this statement execute
   let posts=await post.find({}).populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'}
        });
    let users= await User.find({})
        
    return res.render('home',{
            title:"Home",
            posts:posts,
            all_users:users
    })
}
catch(err)
{
    console.log("Error is ",err);
    return;
}
}