const mongoose=require('mongoose');
const multer=require('multer');
const path=require('path');
const AVATAR_PATH=path.join('/uploads/users/avatars');
const userSchema=new mongoose.Schema(
    {
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:
        {
            type:String,
            required:true,
            unique:true

        }
        ,
        name:{
            type:String,
            required:true,
            
        },
        avatar:{
            type:String
        }
    },{timestamps:true});


    let storage=multer.diskStorage({
        destination:function(req,file,cb){//where file would be store 
            cb(null,path.join(__dirname,'..',AVATAR_PATH));
        },
        filename:function(req,file,cb){// what the name of file
            cb(null,file.fieldname+'_'+Date.now());
        }
    });

//static methods
    userSchema.statics.uploadedAvatar=multer({storage:storage}).single('avatar');//this is used for upload storage in multer destination or filename
    userSchema.statics.avatarPath=AVATAR_PATH;// through this we can access the file from outside AVATAR_PATH

    const user=mongoose.model('user',userSchema);
    module.exports=user;