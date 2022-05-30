const express=require('express');
const router=express.Router();
const homecontroller=require('../controllers/home_controller');

router.get('/',homecontroller.home);

router.get('/home',homecontroller.home);

module.exports=router;// it just so different files can use this router