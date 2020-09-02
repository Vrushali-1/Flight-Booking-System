const mongoose=require('mongoose');




exports.connect = () => {

    return new Promise((resolve,reject)=>{
    if(process.env.NODE_ENV==='test'){
       const Mockgoose=require('mockgoose').Mockgoose;
       const mockgoose=new Mockgoose(mongoose);
       return  mockgoose.prepareStorage();
    }
    else{
        return  mongoose.connect(`mongodb+srv://Vrushali:Vrushali@1@cluster0.hidz8.mongodb.net/flight?retryWrites=true&w=majority`,{ useNewUrlParser: true , useUnifiedTopology: true  });
    }
   })  
 }

