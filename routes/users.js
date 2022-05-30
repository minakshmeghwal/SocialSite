const express=require('express');
const router=express.Router();
const profile_user=require("../controllers/users_controller");

router.get('/profile',profile_user.profile);

module.exports=router;