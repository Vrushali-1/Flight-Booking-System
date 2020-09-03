const mongoose=require('mongoose');
const Flight=require('../model/flight');


exports.add=(req,res,next)=>{
    
    Flight.find({name:req.body.name})
          .exec()
          .then( flights => {

            if(flights.length <1){
                const date=new Date(req.body.date);
                const flight= new Flight({
                       _id:new mongoose.Types.ObjectId(),
                       name:req.body.name,
                       from:req.body.from,
                       to:req.body.to,
                       date:date,
                       fare:req.body.fare,
                });

                flight.save()
                      .then( result => {
                           res.status(201).send({
                            message:"Flight Added!",
                            flight:result
                           });
                       })
                       .catch( err => {
                          res.status(501).send({
                          error:err,
                           message:"Missing Parameters"
                         });
                       });
            }else{
                 res.status(500).json({
                     message:"Flight exists!"
                 })
            }
            
        })

    
};


exports.update=(req,res,next) => {
     
     const date=new Date(req.body.date);
     const name=req.body.name;
     const from=req.body.from;
     const to=req.body.to;
     const fare=req.body.fare;
     Flight.update({_id:req.params.flightId},{name:name,from:from,to:to,date:date,fare:fare })
           .exec()
           .then( result => {
               res.status(200).json({
                   message:'Flight Updated!!',
                   flight:result
               });
           })
           .catch(err => {
               res.status(500).json({
                    error:err
               });
           });
};

exports.get=(req,res,next) => {
      
     Flight.find()
           .exec()
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

exports.getOne=(req,res,next) => {

    Flight.findOne({_id:req.params.flightId})
          .exec()
          .then( result => {
            res.status(200).json({
              message:'Flight!!',
              flight:result
            });
          })
          .catch(err => {
            res.status(500).json({
               error:err
          });
      });
};

exports.remove= (req,res,next) => {
    Flight.deleteOne({_id:req.params.flightId})
        .exec()
        .then(result => {
            res.status(200).json({
                message:"Flight deleted!",
                flight:result
            });
        })
        .catch(err => {
            res.status(500).json({
                 error:err
            });
        });
}