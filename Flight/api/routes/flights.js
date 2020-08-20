const express=require('express');
const { route } = require('../../app');
const router=express.Router();  
const flightController=require('../controller/flight');

router.post('/add',flightController.add);

router.patch('/update/:flightId',flightController.update);

router.get('/find',flightController.get);

router.get('/findone/:flightId',flightController.getOne);

router.delete('/delete/:flightId',flightController.remove);

module.exports=router;