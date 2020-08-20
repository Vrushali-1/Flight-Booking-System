const express=require('express');
const { route } = require('../../app');
const router=express.Router();  
const UserController=require('../controller/user');


router.post('/signup',UserController.signup);


router.post('/login',UserController.login);

router.delete('/:userId',UserController.deleteUser)




module.exports=router;