const mongoose=require('mongoose');
const Flight=require('../model/flight');

exports.search=(req,res,next) => {

      const from=req.body.from;
      const to=req.body.to;
      const date=new Date(req.body.date);

      Flight.find({from:from,to:to,date:date})
             .then( result => {
                    res.status(200).json({
                     message:'All Flights!!',
                     flights:result
                    });
              })
              .catch(err => {
                    res.status(500).json({
                       error:err
                    });
              });
};