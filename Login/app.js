const express=require('express');
const morgan=require('morgan');
const app=express();
const bodyparser=require('body-parser');
const mongoose=require('mongoose');
const userRoutes=require('./api/routes/users');
const cors=require('cors');
const swaggerJsdoc=require("swagger-jsdoc");
const swaggerUi=require("swagger-ui-express");

const options ={
apis:['./api/routes/users.js'],


    swaggerDefinition:{
        info : {
            title: 'Login API',
            description:'Login API Information',
            contact:{
                name:'Vrushali Patil'
            },
            servers:["http://localhost:4000"]
        }
    },
};


const specs = swaggerJsdoc(options);
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(specs));

if(process.env.NODE_ENV==="test"){
    mongoose.connect(`mongodb+srv://Vrushali:Vrushali@1@cluster0.hidz8.mongodb.net/testlogin?retryWrites=true&w=majority`,{ useNewUrlParser: true , useUnifiedTopology: true  })
    .then(()=>{console.log("connected to test database")});
} 
else{
    mongoose.connect(`mongodb+srv://Vrushali:Vrushali@1@cluster0.hidz8.mongodb.net/login?retryWrites=true&w=majority`,{ useNewUrlParser: true , useUnifiedTopology: true  })
    .then(()=>{console.log("connected to dev database")});
}

app.use(morgan('dev'));
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.use(cors());
/*app.use((req, res, next) => {
    res.header('Access-Control-Allow-Headers', '*');
    next();
});*/
  

app.use('/user',userRoutes);





module.exports=app;