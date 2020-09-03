process.env.NODE_ENV='test';
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let server=require('../server');
const { response } = require('express');
const request=require('supertest');

chai.use(chaiHttp);

describe("/sign up",()=>{

    const user={
        firstname:"Vrushali",
        lastname:"Patil",
        username:"Vrushali",
        email:"vru@gmail.com",
        password:"Vrushali@1",
        gender:"female"
    }
   it("it should perform successful sign",(done)=> {

    chai.request("http://localhost:4000/user")
    .post('/signup')
    .send(user)
    .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql( "User Created!")
          res.body.should.have.property('user');
      done();
    });
   })

})


describe("/log in",()=>{

    const user={
        
        username:"Vrushali",
        
        password:"Vrushali@1",

        role:'user'
       
    }
   it("it should perform successful sign",(done)=> {

    chai.request("http://localhost:4000/user")
    .post('/login')
    .send(user)
    .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql( "Auth successful")
          res.body.should.have.property('user');
          res.body.should.have.property('accessToken');
      done();
    });
   })

})

describe("/delete request",()=>{

   
   it("it should delete the user",(done)=> {

    chai.request("http://localhost:4000/user")
    .delete('/5f5161e0b96f250c105f37b8')
    .send()
    .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql( "User deleted!")
      done();
    });
   })

})

