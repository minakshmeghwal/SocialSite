const post=require('../models/post');
const comment=require('../models/comment')
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
module.exports.destroy=function(req,res)
{
    post.findById(req.params.id,function(err,post)
    {
        if(post.user==req.user.id)
        {
            post.remove();
            comment.deleteMany({post:req.params.id},function(err)
            {
                return res.redirect('back');
            });
        }
        else{
            return res.redirect('back');
        }
    })
}
