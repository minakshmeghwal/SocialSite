const comment=require('../models/comment');
const Post=require('../models/post')
const user=require('../models/user');
const commentMailer=require('../mailers/commentsMailer');

//in this we need both comment and post
module.exports.create=async function(req,res)
{   try{
    let post1=await Post.findById(req.body.post);
    if(post1)
    {
        let Comment=await comment.create(
            {
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            });
            post1.comments.push(Comment);
            post1.save();
            //.populate({path : 'userId', populate : {path : 'reviewId'}}).exec(...)
            let user1=await user.findById(Comment.user);
            console.log(user1);
            commentMailer.newComment(user1);
            
        //req.flash('success','Comment successfully added');
        res.redirect('/')
    }
    else{
        req.flash('error','Comment not added');
        res.redirect('/')
    }
    }
    catch(err)
    {
        req.flash('error',err);
        return ;
    }
    // post.findById(req.body.post,function(err,post)
    // {
    //     if(post)
    //     {
    //         comment.create(
    //             {
    //                 content:req.body.content,
    //                 post:req.body.post,
    //                 user:req.user._id
    //             },
    //             function(err,comment)
    //             {   //push comment into post comments array
    //                 post.comments.push(comment),
    //                 post.save(),
    //                 res.redirect('/')
    //             }
    //         )
    //     }
    // });
}
module.exports.destroy=function(req,res)
{
    comment.findById(req.params.id,function(err,comment)
    {
        if(comment.user==req.user.id)
        {
            let postId=comment.post;
            comment.remove();
            Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}},function(err,post)
            {
                return res.redirect('back');
            })
        }else{
            return res.redirect('back');
        }
    })
}