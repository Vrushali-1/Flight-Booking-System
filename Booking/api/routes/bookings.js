const express=require('express');
const { route } = require('../../app');
const router=express.Router();
const bookingController=require('../controllers/bookings');
const middleware=require('../middleware/helpers');


/**
 * @swagger
 *       /bookings/book:
 *                   post:
 *                       description: to book the flight
 *                       responses:
 *                                201:
 *                                    description: A successful booking operation
 *                    
 */
router.post('/book',middleware.verifyToken,bookingController.book);


/**
 * @swagger
 *       /bookings/cancel/:id:
 *                   delete:
 *                       description: to cancel the bookings
 *                       responses:
 *                                500:
 *                                    description: Some problem occured during cancellation of booking.
 *                                201:
 *                                    description: Booking cancelled successfully.
 *                    
 */
router.delete('/cancel/:id',middleware.verifyToken,bookingController.cancel);

/**
 * @swagger
 *       /bookings/search/:id:
 *                     get:
 *                       description: to get the booking from entered booking no.
 *                       responses:
 *                                500:
 *                                    description: Some problem occured during search booking.
 *                                201:
 *                                    description: Searching of booking on the basis of booking number is successful.
 *                    
 */
router.get('/search/:id',middleware.verifyToken,bookingController.search);

/**
 * @swagger
 *       /bookings/searchByUserId/:userId:
 *                     get:
 *                       description: to search the bookings user vise
 *                       responses:
 *                                500:
 *                                    description: Some problem occured during search booking.
 *                                201:
 *                                    description: Successful search operation.
 *                    
 */
router.get('/searchByUserId/:userId',middleware.verifyToken,bookingController.userId);
module.exports=router;