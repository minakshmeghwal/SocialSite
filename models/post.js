const mongoose=require('mongoose');
const postSchema=new mongoose.Schema(
    {
        content:
        {
            type:String,
            required:true
        },
        user:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        }
    },
    {timestamps:true});//it store information about created at updated at

    const post=mongoose.model('post',postSchema);
    module.exports=post;