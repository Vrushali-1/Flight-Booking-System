const express=require('express');
const { route } = require('../../app');
const router=express.Router();  
const UserController=require('../controller/user');

/**
 * @swagger
 *       /user/signup:
 *                   post:
 *                       description: use to register the user
 *                       responses:
 *                                409: 
 *                                    description: Email exists
 *                                200:
 *                                    description: A successful registration
 *                    
 */
router.post('/signup',UserController.signup);


/**
 * @swagger
 *       /user/login:
 *                   post:
 *                       description: use to login the user into the system
 *                       responses:
 *                                401: 
 *                                    description: Username does not exists
 *                                200:
 *                                    description: A successful login
 *                    
 */
router.post('/login',UserController.login);


/**
 * @swagger
 *       /user/:userId:
 *                 post:
 *                       description: use to delete the user
 *                       responses:
 *                                500: 
 *                                    description: Some problem occured during deletion 
 *                                200:
 *                                    description: A successful deletion
 *                    
 */
router.delete('/:userId',UserController.deleteUser);


/**
 * @swagger
 *       /user/:role:
 *                   post:
 *                       description: use to find the use
 *                       responses:
 *                                500: 
 *                                    description: Some problem occured during retrieval 
 *                                200:
 *                                    description: A successful retrieval
 *                    
 */





module.exports=router;