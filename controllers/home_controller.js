const post=require('../models/post');
const User=require('../models/user');
// through this it can access this method outside the file
module.exports.home=function(req,res)
{   //console.log(req.cookie);


    // post.find({},function(err,posts)
    // {
    //     return res.render('home',{
    //         title:"Home",
    //         posts:posts
    //     });
    // })

    //changing in code of above

    post.find({}).populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'}
        }).exec(function(err,posts)
        {   
            User.find({},function(err,users)
        {
            return res.render('home',{
                title:"Home",
                posts:posts,
                all_users:users
        })
        });
    
})
}