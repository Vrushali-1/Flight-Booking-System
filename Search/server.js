const http=require('http');
const port=process.env.port || 9000;
const app=require('./app');



const server=http.createServer(app);

server.listen(port,()=>{console.log("Listening to the port : "+port)});