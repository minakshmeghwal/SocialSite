const Post=require('../models/post');
const comment=require('../models/comment')

module.exports.create= async function(req,res)
{   try{
    let post=await Post.create({
        content:req.body.content,
        user:req.user._id
    });
    if(req.xhr)// check request is xml html request or not it is json request
    {
        return res.status(200).json({
            data:{
                post:post
            },
            message:"post created !"
        });
    }



    req.flash('success','Post published');

    return res.redirect('back');

    }catch(err)
        {
            req.flash('error',err);
            return res.redirect('back');
    }
    
}
module.exports.destroy=async function(req,res)
{   try{
    let post=await Post.findById(req.params.id);
   
    if(post.user==req.user.id)
    {
        post.remove();
        await comment.deleteMany({post:req.params.id});
        
        //it check wehter its ajax request or not wether ajax is using for delete or not
        if(req.xhr)
        {
            return res.status(200).json({
                data:{
                    post_id: req.params.id
                },
                message:"Post deleted successfully"
            });
        }


        req.flash('success','Post and associated comment deleted');
        return res.redirect('back');
    }
    else{
        return res.redirect('back');
    }
    }catch(err)
    {
        req.flash('error',err);
        return res.redirect('back');
    }
    
}
