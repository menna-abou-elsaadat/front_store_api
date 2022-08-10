import express, { Request, Response } from 'express';
import { Order, orderStore } from '../models/order';
import jwt from 'jsonwebtoken';
import { OrderProduct, orderProductStore } from '../models/orderProduct';

const orderProductsStore = new orderProductStore();
const store = new orderStore();
const secret_token = process.env.SECRET_TOKEN;

const create = async (req: Request, res: Response): Promise<void> => {
    const user_id = req.body.user_id;
    try {
      const authorizationHeader = req.headers.authorization;
      const token = (authorizationHeader as string).split(' ')[1];
      jwt.verify(token, secret_token as string);
    } catch {
      res.status(401);
      res.json('Access denied, invalid token');
      return;
    }
    if (user_id && typeof user_id === 'number') {
      try {
        const Order: Order = {
          user_id: user_id,
        };
        const newOrder = await store.create(Order);
        res.json(newOrder);
      } catch (err) {
        res.status(400);
        res.json(err);
      }
    } else {
      res.status(400).send('bad request');
    }
  };

  const complete_order = async (req: Request, res: Response): Promise<void> => {
    const order_id = req.body.order_id;
    try {
      const authorizationHeader = req.headers.authorization;
      const token = (authorizationHeader as string).split(' ')[1];
      jwt.verify(token, secret_token as string);
    } catch {
      res.status(401);
      res.json('Access denied, invalid token');
      return;
    }
    if (order_id && typeof order_id === 'number') {
      try {
        const Order: Order = {
          id: order_id,
        };
        const newOrder = await store.makeItCompleted(Order);
        res.json(newOrder);
      } catch (err) {
        res.status(400);
        res.json(err);
      }
    } else {
      res.status(400).send('bad request');
    }
  };

  const current_orders_for_user = async (req: Request, res: Response): Promise<void> => {
    const user_id = req.body.user_id;
    try {
      const authorizationHeader = req.headers.authorization;
      const token = (authorizationHeader as string).split(' ')[1];
      jwt.verify(token, secret_token as string);
    } catch {
      res.status(401);
      res.json('Access denied, invalid token');
      return;
    }
    if (user_id && typeof user_id === 'number') {
      try {
        const Order: Order = {
          user_id: user_id,
        };
        const newOrder = await store.currentForUser(Order);
        res.json(newOrder);
      } catch (err) {
        res.status(400);
        res.json(err);
      }
    } else {
      res.status(400).send('bad request');
    }
  };

  const completed_orders_for_user = async (req: Request, res: Response): Promise<void> => {
    const user_id = req.body.user_id;
    try {
      const authorizationHeader = req.headers.authorization;
      const token = (authorizationHeader as string).split(' ')[1];
      jwt.verify(token, secret_token as string);
    } catch {
      res.status(401);
      res.json('Access denied, invalid token');
      return;
    }
    if (user_id && typeof user_id === 'number') {
      try {
        const Order: Order = {
          user_id: user_id,
        };
        const newOrder = await store.completedForUser(Order);
        res.json(newOrder);
      } catch (err) {
        res.status(400);
        res.json(err);
      }
    } else {
      res.status(400).send('bad request');
    }
  };

  const add_product = async (req: Request, res: Response): Promise<void> => {
    const order_id = req.body.order_id;
    const product_id = req.body.product_id;
    const product_quantity = req.body.product_quantity;
    try {
      const authorizationHeader = req.headers.authorization;
      const token = (authorizationHeader as string).split(' ')[1];
      jwt.verify(token, secret_token as string);
    } catch {
      res.status(401);
      res.json('Access denied, invalid token');
      return;
    }
    if (order_id && typeof order_id === 'number' && product_id && typeof product_id === 'number' && product_quantity && typeof product_quantity === 'number') {
      try {
        const OrderProduct: OrderProduct = {
          order_id: order_id,
          product_id: product_id,
          product_quantity: product_quantity
        };
        const newOrderProduct = await orderProductsStore.create(OrderProduct);
        res.json(newOrderProduct);
      } catch (err) {
        res.status(400);
        res.json(err);
      }
    } else {
      res.status(400).send('bad request');
    }
  }

  const orderRoutes = (app: express.Application): void => {
    app.post('/orders/complete_order', complete_order);
    app.post('/orders/add_product', add_product);
    app.post('/orders', create);
    app.post('/orders/current', current_orders_for_user);
    app.post('/orders/completed', completed_orders_for_user);
  };
  
  export default orderRoutes;