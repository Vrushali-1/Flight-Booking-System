const mongoose=require('mongoose');
const Booking=require('../model/booking');

exports.book= (req,res,next) => {
     
     const flight=req.body.flight;
     const user=req.body.user;
     const quantity=req.body.quantity;
     const ammount=quantity*flight.fare;

     const booking=new Booking({
        _id:new mongoose.Types.ObjectId(),
        id:Math.floor(Math.random() * 100) + 1,
        user:user,
        flight:flight,
        quantity:quantity,
        ammount:ammount
     });

    
     booking.save()
             .then( result => {
                
                 res.status(500).json({
                     message:"Booking done",
                     booking:result
                 })
             })
             .catch(err => {
                 res.status(401).json({
                     error:err
                 })
             })


}

exports.book= (req,res,next) => {
     
     const flight=req.body.flight;
     const user=req.body.user;
     const quantity=req.body.quantity;
     const ammount=quantity*flight.fare;

     const booking=new Booking({
        _id:new mongoose.Types.ObjectId(),
        id:Math.floor(Math.random() * 100) + 1,
        user:user,
        flight:flight,
        quantity:quantity,
        ammount:ammount
     });

    
     booking.save()
             .then( result => {
                
                 res.status(500).json({
                     message:"Booking done",
                     booking:result
                 })
             })
             .catch(err => {
                 res.status(401).json({
                     error:err
                 })
             })


}

exports.cancel= (req,res,next) => {

    Booking.deleteOne({id:req.params.id})
    .exec()
    .then(result => {
        console.log("inside then");
        res.status(200).json({
            message:"Booking Canceled"
        });
    })
    .catch(err => {
        res.status(500).json({
             error:err
        });
    });
}

exports.search= (req,res,next) => {
    Booking.find({id:req.params.id})
    .select("flight quantity ammount ")
    .exec()
    .then(result => {
         res.status(200).json({
             booking:result
         })
    })
    .catch(err => {
      res.status(500).json({
           error:err
      });
    });
}