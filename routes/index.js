const express=require('express');
const router=express.Router();
const homecontroller=require('../controllers/home_controller');

router.get('/',homecontroller.home);

// router.get('/home',homecontroller.home);
router.use('/users',require('./users'));// this is basically use for if koi bhi url /users/ se start hota hai toh ./users router will handle that

module.exports=router;// it just so different files can use this router