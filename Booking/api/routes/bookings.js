const express=require('express');
const { route } = require('../../app');
const router=express.Router();
const bookingController=require('../controllers/bookings');
const middleware=require('../middleware/helpers');

router.post('/book',middleware.verifyToken,bookingController.book);

router.delete('/cancel/:id',middleware.verifyToken,bookingController.cancel);

router.get('/search/:id',middleware.verifyToken,bookingController.search);

router.get('/searchByUserId/:userId',middleware.verifyToken,bookingController.userId);
module.exports=router;