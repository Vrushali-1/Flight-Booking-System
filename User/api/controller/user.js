const User=require('../model/user');
const bcrypt=require('bcrypt');
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');

exports.signup = (req,res,next) => {
    
    User.find({email:req.body.email})
        .exec()
        .then( user => {
            if (user.length >=1 ){
                return res.status(409).json({
                    message:"Email Exists!!"
                })
            }else{
                
                bcrypt.hash(req.body.password,10,(err,hash)=> {
                    if(err){
                      return res.status(500).json({
                          error:err
                      });
                    } 
                    else{
                        const user= new User({
                            _id: new mongoose.Types.ObjectId(),
                            email:req.body.email,
                            password:hash
                  
                        });
                      user
                        .save()
                        .then( result => {
                            console.log(result);
                            res.status(201).json({
                               message:"User Created!"
                            });
                        })
                        .catch( err => {
                           console.log(err);
                           res.status(500).json({
                               error:err
                           });
                        });
                    }
                });
            };
        });
}

exports.login=(req,res,next)=>{
    
    User.find({email:req.body.email})
        .exec()
        .then( user =>{
             if(user.length < 1){
                 res.status(401).json({
                     message: 'Auth failed'
                 });
             }

             bcrypt.compare(req.body.password,user[0].password,(err,result) => {
                      
                   if(err){
                             return res.status(401).json({
                                  message:'Auth failed'
                             }); 
                   }

                   if(result){

                                const token=jwt.sign({
                                    email:user[0].email,//payload
                                    userId:user[0]._id //paylaod
                                }, 
                                   process.env.JWT_KEY,
                                   {
                                        expiresIn:"1h"
                                   }
                                );
                                return res.status(200).json({
                                      message:'Auth successful',
                                      token:token

                                });     
                   }

                   res.status(401).json({
                             message:'Auth failed'
                   });
 
             });
        })
        .catch( err => {   
            res.status(500).json({
                error:err
            });
        });

};

exports.deleteUser=(req,res,next)=>{
    User.deleteOne({_id:req.params.userId})
        .exec()
        .then(result => {
            res.status(200).json({
                message:"User deleted!"
            });
        })
        .catch(err => {
            res.status(500).json({
                 error:err
            });
        });
};

