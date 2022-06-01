const post=require('../models/post');

module.exports.create=function(req,res)
{
    post.create({
        content:req.body.content,
        user:req.user._id
    },
    function(err,post)
    {
        if(err)
        {
            console.log("Error in creation post done by user");
            return;
        }
        return res.redirect('back');
    });
}