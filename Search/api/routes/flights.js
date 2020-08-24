const express=require('express');
const { route } = require('../../app');
const router=express.Router();  
const flightController=require('../controllers/flight');

router.post('/search',flightController.search);
module.exports=router;