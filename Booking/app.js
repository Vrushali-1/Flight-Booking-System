const express=require('express');
const morgan=require('morgan');
const app=express();
const bodyparser=require('body-parser');
const mongoose=require('mongoose');


mongoose.connect(`mongodb+srv://Vrushali:Vrushali@1@cluster0.hidz8.mongodb.net/bookings?retryWrites=true&w=majority`,{ useNewUrlParser: true , useUnifiedTopology: true  });

app.use(morgan('dev'));
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.use('/bookings',
)

module.exports=app;