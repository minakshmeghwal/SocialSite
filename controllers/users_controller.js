const Users=require('../models/user');//user model import

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
module.exports.update=function(req,res)
{
    if(req.user.id == req.params.id)
    {
        Users.findByIdAndUpdate(req.params.id,req.body,function(err,user)
        {
            return res.redirect('back');
        })
    }
    else{
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