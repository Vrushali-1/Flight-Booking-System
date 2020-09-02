const User=require('../model/user');
const bcrypt=require('bcrypt');
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const { request } = require('http');

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
                            firstname:req.body.firstname,
                            lastname:req.body.lastname,
                            gender:req.body.gender,
                            username:req.body.username,
                            email:req.body.email,
                            role:"user",
                            password:hash
                  
                        });
                      user
                        .save()
                        .then( result => {
                            console.log(result);
                            res.status(201).json({
                               message:"User Created!",
                               user:result
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
    
    User.find({username:req.body.username,role:req.body.role})
        .exec()
        .then( user =>{
             if(user.length < 1){
               return res.status(401).json({
                     message: 'Username does not exists sign up first!'
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
                                    userId:user[0]._id //paylaod
                                }, 
                                   process.env.JWT_KEY,
                                   {
                                        expiresIn:"1h"
                                   }
                                );
                                return res.status(200).json({
                                      message:'Auth successful',
                                      accessToken:token,
                                      user:user[0]

                                });     
                   }

                   return res.status(401).json({
                             message:'Auth failed'
                   });
 
             });
        })
        .catch( err => {   
           return res.status(500).json({
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


exports.find=(req,res,next) =>{
      const role=req.params.role;
      User.find({role:role})
          .exec()
          .then(result => {
               res.status(200).json({
                   users:result
               })
          })
          .catch(err => {
            res.status(500).json({
                 error:err
            });
          });
}
