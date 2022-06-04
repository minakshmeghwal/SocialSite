const Post=require('../../../models/post');
const Comment=require('../../../models/comment');
module.exports.index=async function(req,res)
{   let post=await Post.find({}).
    sort('-createdAt')
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    });
return res.json(200,{
        message:"List of posts",
        posts:post
    })
}
module.exports.destroy=async function(req,res)
{   try{
    let post=await Post.findById(req.params.id);
        if(post.user==req.user.id)
        {
        post.remove();
        await Comment.deleteMany({post:req.params.id});
        
        //it check wehter its ajax request or not wether ajax is using for delete or not
        
        return res.json(200,{
            message:"Post and associated comment is delete"
        });
        }
        else{
            return res.json(401,{
                message:"404 cannot delete the post"
            })
        }
        //return res.redirect('back');
    }catch(err)
    {   console.log(err);
        return res.json(500,{
            message:"Error in internal server"
        })
    }
    
}