const mongoose=require('mongoose');

const bookingSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:{type:String,required:true},
    from:{type:String,required:true},
    to:{type:String,required:true},
    date:{type:Date,required:true},
    fare:{type:Number,required:true}
});

module.exports = mongoose.model('Flight',flightSchema);