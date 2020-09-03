const express=require('express');
const morgan=require('morgan');
const app=express();
const bodyparser=require('body-parser');
const mongoose=require('mongoose');
const cors=require('cors');
const bookingRoute=require('./api/routes/bookings');
const swaggerJsdoc=require("swagger-jsdoc");
const swaggerUi=require("swagger-ui-express");

const options ={
apis:['./api/routes/bookings.js'],


    swaggerDefinition:{
        info : {
            title: 'Booking API',
            description:'Booking API Information',
            contact:{
                name:'Vrushali Patil'
            },
            servers:["http://localhost:7000"]
        }
    },
};


const specs = swaggerJsdoc(options);
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(specs));

if(process.env.NODE_ENV==="test"){
    mongoose.connect(`mongodb+srv://Vrushali:Vrushali@1@cluster0.hidz8.mongodb.net/testbookings?retryWrites=true&w=majority`,{ useNewUrlParser: true , useUnifiedTopology: true  })
    .then(()=>{console.log("connected to test database")});
} 
else{
    mongoose.connect(`mongodb+srv://Vrushali:Vrushali@1@cluster0.hidz8.mongodb.net/bookings?retryWrites=true&w=majority`,{ useNewUrlParser: true , useUnifiedTopology: true  })
    .then(()=> {console.log("connected to dev database")})
}


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