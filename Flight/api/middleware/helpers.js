const jwt=require('jsonwebtoken');



exports.verifyToken =(req,res,next) => {
    
        if(req.headers["x-access-token"]){
        let token = req.headers["x-access-token"];
      
        if (!token) {
          return res.status(403).send({ message: "No token provided!" });
        }
      
        jwt.verify(token, 'secret', (err, decoded) => {
          if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
          }
          req.userId = decoded.id;
          next();
        });
      }else if(req.header("Authorization")){
           let authHeader=req.header("Authorization");
           let accessToken=authHeader.split(' ')[1];
           if (!accessToken) {
            return res.status(403).send({ message: "No token provided!" });
          }
        
          jwt.verify(accessToken, 'secret', (err, decoded) => {
            if (err) {
              return res.status(401).send({ message: "Unauthorized!" });
            }
            req.userId = decoded.id;
            next();
          });

      }
      
}
