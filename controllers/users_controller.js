const Users=require('../models/user');//user model import

module.exports.profile=function(req,res)
{
    return res.end('<h1> hey here is a profile</h1');
}

//for user sign in controller
module.exports.signIn=function(req,res)
{
    return res.render('user_sign_in',
    {
        title:"user Sign In"
    });
}
//for user sign up controller
module.exports.signUp=function(req,res)
{
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
}