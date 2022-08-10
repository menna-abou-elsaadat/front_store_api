import express, { Request, Response } from 'express';
import { User, userStore } from '../models/user';
import jwt from 'jsonwebtoken';

const store = new userStore();
const secret_token = process.env.SECRET_TOKEN;
const index = async (req: Request, res: Response): Promise<void> => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = (authorizationHeader as string).split(' ')[1];
    jwt.verify(token, secret_token as string);

    const users = await store.index();
    res.json(users);
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

    const user = await store.show(id);
    res.json(user);
  } catch {
    res.status(401);
    res.json('Access denied, invalid token');
    return;
  }
};

const create = async (req: Request, res: Response): Promise<void> => {
  const user_name = req.body.user_name;
  const password = req.body.password;
  if (
    user_name &&
    typeof user_name === 'string' &&
    password &&
    typeof password === 'string'
  ) {
    try {
      const user: User = {
        user_name: user_name,
        password: password
      };
      const newUser = await store.create(user);
      const token = jwt.sign(
        {
          user: {
            name: newUser.user_name,
            id: newUser.id
          }
        },
        secret_token as string
      );
      res.json(token);
    } catch (err) {
      res.status(400);
      res.json(err);
    }
  } else {
    res.status(400).send('bad request');
  }
};

const authenticate = async (req: Request, res: Response): Promise<void> => {
  const user_name = req.body.user_name;
  const password = req.body.password;

  if (
    user_name &&
    typeof user_name === 'string' &&
    password &&
    typeof password === 'string'
  ) {
    try {
      const user = await store.authenticate(user_name, password);
      if (user) {
        const token = jwt.sign(
          {
            user: {
              name: user.user_name,
              id: user.id
            }
          },
          secret_token as string
        );
        res.json(token);
      } else {
        res.sendStatus(401);
      }
    } catch (err) {
      res.sendStatus(500);
    }
  } else {
    res.status(400).send('bad request');
  }
};

const userRoutes = (app: express.Application): void => {
  app.get('/users', index);
  app.get('/users/:id', show);
  app.post('/users', create);
  app.post('/users/authenticate', authenticate);
};

export default userRoutes;
