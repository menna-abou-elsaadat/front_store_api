import supertest from "supertest";
import express from 'express';

const app = express();

it('create order enpoint',function(){
    supertest(app)
    .post('/orders')
    .send({'user_id':1})
    .expect('Content-Type', 'json')
  })

  it('complete order endpoint',function(){
    supertest(app)
    .post('/orders/complete_order')
    .send({'order_id':1})
    .expect('Content-Type', 'json')
  })

  it('add product to order endpoint',function(){
    supertest(app)
    .post('/orders/add_product')
    .send({'order_id':1,'product_id':1})
    .expect('Content-Type', 'json')
  })

  it('return current orders endpoint',function(){
    supertest(app)
    .post('/orders/current')
    .send({'user_id':1})
    .expect('Content-Type', 'json')
  })

  it('return completed orders endpoint',function(){
    supertest(app)
    .post('/orders/completed')
    .send({'user_id':1})
    .expect('Content-Type', 'json')
  })