const express=require('express');
const { route } = require('../../app');
const router=express.Router();  
const flightController=require('../controller/flight');
const middleware=require('../middleware/helpers');

router.post('/add',middleware.verifyToken,flightController.add);

router.put('/update/:flightId',middleware.verifyToken,flightController.update);

router.get('/find',middleware.verifyToken,flightController.get);

router.get('/findone/:flightId',middleware.verifyToken,flightController.getOne);

router.delete('/delete/:flightId',middleware.verifyToken,flightController.remove);

module.exports=router;