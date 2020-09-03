const mongoose=require('mongoose');
const Booking=require('../model/booking');

exports.book= (req,res,next) => {
     
     const flight=req.body.flight;
     const user=req.body.user;
     const quantity=req.body.quantity;
     const ammount=quantity*flight.fare;
    

     const booking=new Booking({
        _id:new mongoose.Types.ObjectId(),
        bookingNo:`${flight.name}${Math.floor(Math.random() * 100) + 1}`,
        user:user,
        flight:flight,
        quantity:quantity,
        ammount:ammount
     });

    
     booking.save()
             .then( result => {
                
                 res.status(201).json({
                     message:"Booking done",
                     booking:result
                 })
             })
             .catch(err => {
                 res.json({
                     error:err
                 })
                 console.log(err);
             })


}



exports.cancel= (req,res,next) => {

    Booking.deleteOne({_id:req.params.id})
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
    Booking.find({bookingNo:req.params.id})
    .select()
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



exports.userId=(req,res,next)=>{

          const id=req.params.userId;
          var bookings=[];
          
          Booking.find()
                 .exec()
                 .then(result => {
                     
                    for(i=0;i<result.length;i++){
                        if(result[i].user._id===id){
                            bookings.push(result[i]);
                        }
                    }
                     console.log(bookings);
                     res.status(200).json({
                         userBookings:bookings
                     })
                 })
                   


}





