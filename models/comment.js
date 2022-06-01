const mongoose=require('mongoose');
const commentSchema=new mongoose.Schema(
    {
        content:
        {
            type:String,
            required:true
        },
        user:
        {   //it is storing id of that object and ref is given
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        },
        post:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'post'
        }

    },{
        timestamps:true
    }
);
const comment=mongoose.model('comment',commentSchema);// here 'comment' is db name
module.exports=comment;