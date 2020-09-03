process.env.NODE_ENV='test';
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let server=require('../server');
const { response } = require('express');
const request=require('supertest');

chai.use(chaiHttp);

let token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjQ0YTJjOTA1ZGY0YjM2NmM0YzNlNmMiLCJpYXQiOjE1OTkxNjQ4ODEsImV4cCI6MTU5OTE2ODQ4MX0.9h3pGISr_kOv-weM8C-52SonMnOB9Z-hxLJEfV0wa6k";

describe('/post booking', () => {
 
  
  
    it('it should post a booking object', (done) => {
      let booking = {
          flight:{
          name:"B1001",
          to:"Mumbai",
          date:"2020-09-04",
          fare:1000
          },
          user:{
              _id:"1233145",
              firstname:"samrat",
              lastname:"musale",
              email:"samrat@gmail.com",
              username:"Samrat",
              role:"role"
          },
          quantity:2
      }
    chai.request("http://localhost:7000/bookings")
        .post('/book')
        .set(`x-access-token`,`${token}`)
        .send(booking)
        .end((err, response) => {
              response.should.have.status(201);
              response.body.should.be.a('object');
              response.body.should.have.property('booking');
              response.body.booking.should.have.property('flight');
              response.body.booking.should.have.property('quantity');
              response.body.booking.should.have.property('user');
          done();
        });
    });
});

describe('/search booking', () => {
 
  
  
    it('it should a booking object', (done) => {
     
    chai.request("http://localhost:7000/bookings")
        .get('/search/B100245')
        .set(`x-access-token`,`${token}`)
        .end((err, response) => {
              response.should.have.status(200);
              response.body.should.be.a('object');
              response.body.should.have.property('booking');
    
          done();
        });
    });
});


describe('/search bookings userwise booking', () => {
 
  
  
    it('it should search the bookings userwise', (done) => {
     
    chai.request("http://localhost:7000/bookings")
        .get('/searchByUserId/5f4c0f790310802fb47ccda6')
        .set(`x-access-token`,`${token}`)
        .end((err, response) => {
              response.should.have.status(200);
              response.body.should.be.a('object');
              response.body.should.have.property('userBookings');
         done();
        });
    });
});

describe('/delete booking', () => {
 
  
  
    it('it should a booking object', (done) => {
     
    chai.request("http://localhost:7000/bookings")
        .delete('/cancel/5f51559287eaa52a24373dce')
        .set(`x-access-token`,`${token}`)
        .end((err, response) => {
              response.should.have.status(200);
              response.body.should.be.a('object');
              response.body.should.have.property('message').eql("Booking Canceled");
    
          done();
        });
    });
});

