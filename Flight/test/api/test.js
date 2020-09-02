const assert=require('chai').assert;
const app=require('../../app');
const routes=require('../../api/routes/flights');
const { request } = require('http');
const { expect } = require('chai');
const mongoose=require('mongoose');

describe('',() =>{

    before((done) =>{
 
        const Mockgoose=require('mockgoose').Mockgoose;
        const mockgoose=new Mockgoose(mongoose);
        mockgoose.prepareStorage()
                 .then(() => done())
                 .catch((err) => done(err));
    })

    it('ok, creating a new post works',(done) => {
        request(routes).post('/add')
                        .send({name:"B1033",from:"Mumbai",to:"Pune",date:"2020-05-30",fare:500})
                        .then((res) =>{
                            const body=res.body;
                            expect(body).to.contain.property('flight');
                            done();
                        })
    })
        
    




})
