import supertest from "supertest";
import express from 'express';

const app = express();

it('test users enpoint',function(){
    supertest(app)
    .get('/users')
    .expect('Content-Type', 'json')
  })

  it('test create user enpoint',function(){
    const random_number = Math.random();
    supertest(app)
    .post('/users')
    .send({'user_name':'user'+random_number,'password':'123456'})
    .expect('Content-Type', 'string')
  })

  it('test show user enpoint',function(){
    supertest(app)
    .get('/users/1')
    .expect('Content-Type', 'json')
  })