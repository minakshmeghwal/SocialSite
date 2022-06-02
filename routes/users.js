const express=require('express');
const router=express.Router();
const passport=require('passport');
const profile_user=require("../controllers/users_controller");

//for user profile router and profiel page only access when checkauthentication send true
router.get('/profile/:id',passport.checkAuthentication,profile_user.profile);

//for user sign in router
router.get('/sign-in',profile_user.signIn);

//for user sign up router
router.get('/sign-up',profile_user.signUp);

//router for creating an user
router.post('/create',profile_user.create);

//router for create session
router.post('/create-session',passport.authenticate('local',{
    failureRedirect:'/users/sign-in'
}),profile_user.createSession);




module.exports=router;