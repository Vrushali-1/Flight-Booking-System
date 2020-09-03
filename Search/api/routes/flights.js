const express=require('express');
const { route } = require('../../app');
const router=express.Router();  
const flightController=require('../controllers/flight');


/**
 * @swagger
 *       /flight/search:
 *                   post:
 *                       description: use to search the flight
 *                       responses:
 *                                500: 
 *                                    description: Some problem occured during searching of flughts
 *                                200:
 *                                    description: A successful search operation is performed
 *                    
 */
router.post('/search',flightController.search);
module.exports=router;