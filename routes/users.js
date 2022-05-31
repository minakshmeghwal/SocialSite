const express=require('express');
const router=express.Router();
const profile_user=require("../controllers/users_controller");

//for user profile router
router.get('/profile',profile_user.profile);

//for user sign in router
router.get('/sign-in',profile_user.signIn);

//for user sign up router
router.get('/sign-up',profile_user.signUp);

//router for creating an user
router.post('/create',profile_user.create);

module.exports=router;