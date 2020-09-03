process.env.NODE_ENV='test';
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let server=require('../server');
const { response } = require('express');
const axios=require('axios');
const request=require('supertest');

chai.use(chaiHttp);

let token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjQ0YTJjOTA1ZGY0YjM2NmM0YzNlNmMiLCJpYXQiOjE1OTkxNTg0NjUsImV4cCI6MTU5OTE2MjA2NX0.2989U_iKV7gufr6XGu5Dj8nvfvKPz-T1QK3TEwE-Gm8";

describe('/post flight', () => {
 
  
  
  it('it should not POST a flight without from parameter', (done) => {
    let flight = {
        name:"B1001",
        to:"Mumbai",
        date:"2020-09-04",
        fare:1000
    }
  chai.request("http://localhost:5000/flight")
      .post('/add')
      .set(`x-access-token`,`${token}`)
      .send(flight)
      .end((err, res) => {
            res.should.have.status(501);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql( "Missing Parameters")
            res.body.should.have.property('error');
        done();
      });
  });
  



  it('it should POST a flight', (done) => {
    let flight = {
        name:"B1001",
        from:"Chennai",
        to:"Mumbai",
        date:"2020-09-04",
        fare:1000
    }
  chai.request("http://localhost:5000/flight")
      .post('/add')
      .set(`x-access-token`,`${token}`)
      .send(flight)
      .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Flight Added!')
            res.body.should.have.property('flight');
            res.body.flight.should.have.property('name');
            res.body.flight.should.have.property('from');
            res.body.flight.should.have.property('to');
            res.body.flight.should.have.property('date');
            res.body.flight.should.have.property('fare');

        done();
      });
});
  
  it('it should not POST a flight', (done) => {
    let flight = {
        name:"B1001",
        from:"Chennai",
        to:"Mumbai",
        date:"2020-09-04",
        fare:1000
    }
  chai.request("http://localhost:5000/flight")
      .post('/add')
      .set(`x-access-token`,`${token}`)
      .send(flight)
      .end((err, res) => {
            res.should.have.status(500);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Flight exists!');

        done();
      });
});



});


describe('/find flights',() => {  
  it('it should get all the flights ', (done) => {
        
          request("http://localhost:5000/flight")
          .get('/find')
          .set(`x-access-token`,`${token}`)
          .send()
          .end((err, response) => {
             response.should.have.status(200);   
            response.body.should.have.property('flights');
            response.body.should.have.property('message').eql('All Flights!!');
            //console.log(err);
               
            done();
          });
    });

  it('it should find one flight', (done) => {
        
      request("http://localhost:5000/flight")
      .get('/findone/5f5146bb7c1e0c394877b237')
      .set(`x-access-token`,`${token}`)
      .send()
      .end((err, response) => {
         response.should.have.status(200);   
        response.body.should.be.a('object');
        response.body.should.have.property('flight');
        response.body.should.have.property('message').eql('Flight!!');
        response.body.flight.should.have.property('name');
        response.body.flight.should.have.property('from');
        response.body.flight.should.have.property('to');
        response.body.flight.should.have.property('date');
        response.body.flight.should.have.property('fare');
        
           
        done();
      });
});
});

describe('/update flight',()=> {
  let flight = {
    name:"B10089",
    from:"Pune",
    to:"Banglore",
    date:"2020-10-04",
    fare:1000
}
  it('it should update one flight', (done) => {
        
    request("http://localhost:5000/flight")
    .put('/update/5f5146bb7c1e0c394877b237')
    .set(`x-access-token`,`${token}`)
    .send(flight)
    .end((err, response) => {
      response.should.have.status(200);   
      response.body.should.be.a('object');
      response.body.should.have.property('flight');
      response.body.should.have.property('message').eql('Flight Updated!!');       
      done();
    });
});

});


describe('/delete flight',()=> {

  it('it should delete one flight', (done) => {
        
    request("http://localhost:5000/flight")
    .delete('/delete/5f5146bb7c1e0c394877b237')
    .set(`x-access-token`,`${token}`)
    .send()
    .end((err, response) => {
      response.should.have.status(200);   
      response.body.should.be.a('object');
      response.body.should.have.property('flight');
      response.body.should.have.property('message').eql('Flight deleted!');       
      done();
    });
});

})









