const passport=require('passport');
const JWTStrategy=require('passport-jwt').Strategy;
const ExtractJWT=require('passport-jwt').ExtractJwt;
const User=require('../models/user');


let opts={
    jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey:'codeial'// key for encryption
}

passport.use(new JWTStrategy(opts,function(jwtPayLoad,done)
{
    User.findById(jwtPayLoad._id,function(err,user)//jwtPayLoad contain information about token or info about users in encrypted form
    {
        if(err)
        {
            console.log("error in finding users from jwt");
            return ;
        }
        if(user)// user found
        {
            return done(null,user);
        }else{
            return done(null,false);
        }
    })
}))