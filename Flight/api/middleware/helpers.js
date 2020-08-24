const jwt=require('jsonwebtoken');
const jwtExpress=require('express-jwt');


exports.isAuthorized =(req,res,next) => {
    const authHeader=req.headers['authorization'];
    const bearerToken=authHeader.split(' ');
    const token=bearerToken[1];
    jwt.verify(token,process.env.JWT_KEY,(err,payload)=>{
        if(err)
         return next(createError.Unauthorized());
    });
}