import supertest from "supertest";
import express from 'express';

const app = express();

it('test products enpoint',function(){
    supertest(app)
    .get('/products')
    .expect('Content-Type', 'json')
  })

  it('test create product endpoint',function(){
    supertest(app)
    .post('/products')
    .send({'name':'product','price':12})
    .expect('Content-Type', 'json')
  })

  it('test show product enpoint',function(){
    supertest(app)
    .get('/products/1')
    .expect('Content-Type', 'json')
  })