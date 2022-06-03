const Users=require('../models/user');//user model import
const fs=require('fs');
const path=require('path');
module.exports.profile=function(req,res)
{       Users.findById(req.params.id,function(err,user)
    {
        return res.render('user_profile',
    {
        title:" User_Profile",
        profile_user:user
    });
    });
    
}
module.exports.update=async function(req,res)
{
    if(req.user.id == req.params.id)
    {
        try{
            let user=await Users.findById(req.params.id);
            Users.uploadedAvatar(req,res,function(err)//we use this method becoz we cant use req.body directly becoz we declare enctype in form
            {
                if(err)
                {
                    console.log('*****multer error');
                }
                user.name=req.body.name;
                user.email=req.body.email;
                if(req.file)
                {       
                // if(user.avatar)
                // {   //it delete previous file from uploads/users/avatars
                //     fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                // }
                
                //this is saving the uploaded file in avatar feild
                    user.avatar=Users.avatarPath+'/'+req.file.filename;
                }
                user.save();
                return res.redirect('back');
                console.log(req.file);
            });
        }
        catch(err)
        {
            req.flash('error','unauthorized');
            return res.redirect('back');
        }


        // Users.findByIdAndUpdate(req.params.id,req.body,function(err,user)
        // {
        //     return res.redirect('back');
        // })
    }
    else{
        req.flash('error','unauthorized');
        return res.status(404).Send('Unautherized');
    }
}

//for user sign in controller
module.exports.signIn=function(req,res)
{   if(req.isAuthenticated())
    {
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_in',
    {
        title:"user Sign In"
    });
}
//for user sign up controller
module.exports.signUp=function(req,res)
{
    if(req.isAuthenticated())
    {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',
    {
        title:"user Sign Up"
    });
}

//create sign up
module.exports.create=function(req,res)
{   //console.log(req.body);
    if(req.body.password!=req.body.confirm_password)
    {
        return res.redirect('back');
    }
    Users.findOne({email:req.body.email},function(err,user)
    {
        if(err)
        {
            console.log("error in finding user");
            return;
        }
        if(!user)
        {
            Users.create(req.body,function(err,user)
            {
                console.log("Error in creating user");
                return;
            });
            return res.redirect('/users/sign-in');//this is an url in which we will redirect
        }
    })
}


//sign in and create a session
module.exports.createSession=function(req,res)
{
    //TODO
    req.flash('success','Logged in successfully');
    return res.redirect('/');
}
//for sign out
module.exports.destroySession=function(req,res)
{
    
    req.logout(function(err) {
        if (err) { 
            console.log("Error in logged out");

         }
        req.flash('success','Logged Out successfully');
        res.redirect('/');
      });
    
}