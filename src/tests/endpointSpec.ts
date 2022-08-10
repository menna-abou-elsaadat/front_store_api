import supertest from "supertest";
import express from 'express';

const app = express();

it('test users enpoint',function(){
    supertest(app)
    .get('/users')
    .expect('Content-Type', 'json')
  })