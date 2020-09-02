const express=require('express');
const morgan=require('morgan');
const app=express();
const bodyparser=require('body-parser');
const mongoose=require('mongoose');
const cors=require('cors');
const bookingRoute=require('./api/routes/bookings');


mongoose.connect(`mongodb+srv://Vrushali:Vrushali@1@cluster0.hidz8.mongodb.net/bookings?retryWrites=true&w=majority`,{ useNewUrlParser: true , useUnifiedTopology: true  });

app.use(morgan('dev'));
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());


app.use((req,res,next)=>{
    
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With,Content-Type,Accept,Authorization,x-access-token"
    );


    next();
});

app.use(cors());

app.use('/bookings',bookingRoute);

module.exports=app;