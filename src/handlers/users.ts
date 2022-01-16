import express from 'express';
import jwt from 'jsonwebtoken';
import { User, StoreUser } from '../models/users';

const storeUser = new StoreUser();

const index = async (_req: express.Request, res: express.Response) => {
  try {
    const users = await storeUser.index();
    res.json(users);
  } catch (e) {
    res.json(e);
  }
};

const show = async (_req: express.Request, res: express.Response) => {
  try {
    const user = await storeUser.show(_req.body.id);
    res.json(user);
  } catch (e) {
    res.json(e);
  }
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
  try {
    const deleted = await storeUser.delete(_req.body.id);
    res.json(deleted);
  } catch (error) {
    res.json(error);
  }
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

//creating middleware for verifing
const verify = (
  _req: express.Request,
  res: express.Response,
  // eslint-disable-next-line @typescript-eslint/ban-types
  next: Function
) => {
  try {
    const authorization = _req.headers.authorization || '';
    const token = authorization.split(' ')[1];
    jwt.verify(token, process.env.TOKEN_SECRET as string);
    next();
  } catch (e) {
    res.json(e);
    return;
  }
};

const userRoutes = (app: express.Application) => {
  app.get('/users', verify, index);
  app.get('/users/:id', verify, show);
  app.post('/users', create);
  app.delete('/users', deleted);
  app.post('/users/authenticate', authenticate);
};

export default userRoutes;
