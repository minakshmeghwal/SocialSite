const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const User=require('../models/user');

//need to tell passport to use local authentication
passport.use(new LocalStrategy({
    usernameField:'email'
},function(email,password,done)
{
    User.findOne({email:email},function(err,user)
    {
        if(err)
        {
            console.log("error in finding user");
            return;
        }

        if(!user || user.password!=password)
        {
            console.log("error user not found");
            return done(null,false);
        }
        return done(null,user);
    });
}));


//serializing the user to create cookie
passport.serializeUser(function(user,done)
{
    done(null,user.id);//user.id is in encrypted form and it is now cookie
});

//deserilizing the user use that cookie for user detail

passport.deserializeUser(function(id,done)
{
    User.findById(id,function(err,user)
    {
        if(err)
        {
            console.log("error in finding user with this encrypted cookie");
            return done(err);
        }
        return done(null,user);//user find that encrypted cookie
    });
});

//check if user is authenticated or not it is middleware
passport.checkAuthentication=function(req,res,next)
{
    if(req.isAuthenticated())//if the user sign in
    {
        return next();
    }
    //if the user not sign-in
    return res.redirect('users/sign-in');
}

//set the user in views
passport.setAuthenticatedUser=function(req,res,next)
{
    if(req.isAuthenticated())
    {   //console.log(req.user);
        res.locals.user=req.user;
    }
    next();
}

module.exports=passport;//export that passport