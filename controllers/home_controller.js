const post=require('../models/post');
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

    post.find({}).populate('user').exec(function(err,posts)
    {
        return res.render('home',{
                    title:"Home",
                    posts:posts
        });
    
})
}