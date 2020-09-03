process.env.NODE_ENV='test';
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let server=require('../server');
const { response } = require('express');
const request=require('supertest');

chai.use(chaiHttp);

let token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjQ0YTJjOTA1ZGY0YjM2NmM0YzNlNmMiLCJpYXQiOjE1OTkxNTg0NjUsImV4cCI6MTU5OTE2MjA2NX0.2989U_iKV7gufr6XGu5Dj8nvfvKPz-T1QK3TEwE-Gm8";

describe('/search flights',() => {  
    it('it should get all the flights ', (done) => {
          const flight={
              from:"Banglore",
              to:"Chennai",
              date:"2020-05-15"
          }
            request("http://localhost:9000/flight")
            .post('/search')
            .set(`x-access-token`,`${token}`)
            .send(flight)
            .end((err, response) => {
               response.should.have.status(200);   
               response.body.should.be.a('object');
              response.body.should.have.property('flights');
              response.body.should.have.property('message').eql('All Flights!!');
              //console.log(err);
                 
              done();
            });
      })
});