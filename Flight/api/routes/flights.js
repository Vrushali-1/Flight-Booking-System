const express=require('express');
const { route } = require('../../app');
const router=express.Router();  
const flightController=require('../controller/flight');
const middleware=require('../middleware/helpers');


/**
 * @swagger
 *       /flight/add:
 *                   post:
 *                       description: use to add the flight
 *                       responses:
 *                                500: 
 *                                    description: Some problem occured during addition of flight
 *                                201:
 *                                    description: A successful addition of flight
 *                    
 */
router.post('/add',middleware.verifyToken,flightController.add);

/**
 * @swagger
 *       /flight/update/:flightId:
 *                   put:
 *                       description: use to update the flight
 *                       responses:
 *                                500: 
 *                                    description: Some problem occured during updation of flight
 *                                200:
 *                                    description: Flight updated successfully
 *                    
 */
router.put('/update/:flightId',middleware.verifyToken,flightController.update);


/**
 * @swagger
 *       /flight/find:
 *                   get:
 *                       description: use to find the flights
 *                       responses:
 *                                500: 
 *                                    description: Some problem occured during rertieval of flight
 *                                200:
 *                                    description: Retreival of flights happened successfully
 *                    
 */
router.get('/find',middleware.verifyToken,flightController.get);


/**
 * @swagger
 *       /flight/findone/:flightId:
 *                   get:
 *                       description: use to find the one flight
 *                       responses:
 *                                500: 
 *                                    description: Some problem occured during updation of flight
 *                                200:
 *                                    description: Flight updated successfully
 *                    
 */
router.get('/findone/:flightId',middleware.verifyToken,flightController.getOne);


/**
 * @swagger
 *       /flight/delete/:flightId:
 *                   delete:
 *                       description: use to delete the flight
 *                       responses:
 *                                500: 
 *                                    description: Some problem occured during deletion of flight
 *                                200:
 *                                    description: Flight deleted successfully
 *                    
 */
router.delete('/delete/:flightId',middleware.verifyToken,flightController.remove);

module.exports=router;