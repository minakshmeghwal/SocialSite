const express=require('express');
const router=express.Router();
const postsApi=require("../../../controllers/api/v1/posts_api");



router.get('/',postsApi.index);//for showing the posts
router.delete('/:id',postsApi.destroy);//for delete post
module.exports=router;