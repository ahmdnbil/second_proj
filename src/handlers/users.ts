import express from 'express';
import jwt from 'jsonwebtoken';
import { User, StoreUser } from '../models/users';

const storeUser = new StoreUser();

const index = async (_req: express.Request, res: express.Response) => {
  const users = await storeUser.index();
  res.json(users);
};

const show = async (_req: express.Request, res: express.Response) => {
  const user = await storeUser.show(_req.body.id);
  res.json(user);
};

const create = async (_req: express.Request, res: express.Response) => {
  const user: User = {
    firstName: _req.body.firstName,
    lastName: _req.body.lastName,
    password: _req.body.password,
  };
  try {
    const newUser = await storeUser.create(user);
    const token = jwt.sign(
      { user: newUser },
      process.env.TOKEN_SECRET as string
    );
    res.json(token);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const deleted = async (_req: express.Request, res: express.Response) => {
  const deleted = await storeUser.delete(_req.body.id);
  res.json(deleted);
};

const authenticate = async (req: express.Request, res: express.Response) => {
  const user: User = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
  };
  try {
    const u = await storeUser.authenticate(
      user.firstName,
      user.lastName,
      user.password
    );
    const token = jwt.sign({ user: u }, process.env.TOKEN_SECRET as string);
    res.json(token);
  } catch (error) {
    res.status(401);
    res.json({ error });
  }
};

const userRoutes = (app: express.Application) => {
  app.get('/users', index);
  app.get('/users/:id', show);
  app.post('/users', create);
  app.delete('/users', deleted);
  app.post('/users/authenticate', authenticate);
};

export default userRoutes;
