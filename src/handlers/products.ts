import express, { Request, Response } from 'express';
import { Product, productStore } from '../models/product';
import jwt from 'jsonwebtoken';

const store = new productStore();
const secret_token = process.env.SECRET_TOKEN;

const index = async (req: Request, res: Response): Promise<void> => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = (authorizationHeader as string).split(' ')[1];
    jwt.verify(token, secret_token as string);

    const products = await store.index();
    res.json(products);
  } catch {
    res.status(401);
    res.json('Access denied, invalid token');
    return;
  }
};

const show = async (req: Request, res: Response): Promise<void> => {
  const id: number = parseInt(req.params.id as string);
  try {
    const authorizationHeader = req.headers.authorization;
    const token = (authorizationHeader as string).split(' ')[1];
    jwt.verify(token, secret_token as string);

    const product = await store.show(id);
    res.json(product);
  } catch {
    res.status(401);
    res.json('Access denied, invalid token');
    return;
  }
};

const create = async (req: Request, res: Response): Promise<void> => {
  const name = req.body.name;
  const price = req.body.price;
  try {
    const authorizationHeader = req.headers.authorization;
    const token = (authorizationHeader as string).split(' ')[1];
    jwt.verify(token, secret_token as string);
  } catch {
    res.status(401);
    res.json('Access denied, invalid token');
    return;
  }
  if (name && typeof name === 'string' && price && typeof price === 'number') {
    try {
      const product: Product = {
        name: name,
        price: price
      };
      const newProduct = await store.create(product);
      res.json(newProduct);
    } catch (err) {
      res.status(400);
      res.json(err);
    }
  } else {
    res.status(400).send('bad request');
  }
};

const productRoutes = (app: express.Application): void => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products', create);
};

export default productRoutes;
