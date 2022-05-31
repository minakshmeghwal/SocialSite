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
{
    //TODO
}


//sign in and create a session
module.exports.createSession=function(req,res)
{
    //TODO
}