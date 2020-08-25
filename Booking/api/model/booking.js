const mongoose=require('mongoose');

const bookingSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    id:{type:Number},
    user:{},
    flight:{},
    quantity:{type:Number,required:true},
    ammount:{type:Number,required:true}
});


module.exports = mongoose.model('Booking',bookingSchema);
