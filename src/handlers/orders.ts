import express from 'express';
import { ProductOrder, Order, StoreOrder } from '../models/orders';
import jwt from 'jsonwebtoken';

const storeOrder = new StoreOrder();

const index = async (_req: express.Request, res: express.Response) => {
  try {
    const orders = await storeOrder.index();
    res.json(orders);
  } catch (e) {
    res.json(e);
  }
};

const show = async (_req: express.Request, res: express.Response) => {
  try {
    const product = await storeOrder.show(_req.body.id);
    res.json(product);
  } catch (e) {
    res.json(e);
  }
};

const addingProduct = async (_req: express.Request, res: express.Response) => {
  const order: ProductOrder = {
    order_id: _req.body.order_id,
    product_id: _req.body.product_id,
    quantity: _req.body.quantity,
  };
  try {
    const adding = await storeOrder.addingProduct(order);
    res.json(adding);
  } catch (e) {
    res.status(400);
    res.json(e);
  }
};

const create = async (_req: express.Request, res: express.Response) => {
  const order: Order = {
    user_id: _req.body.user_id,
    status: _req.body.status,
  };
  try {
    const newOrder = await storeOrder.create(order);
    res.json(newOrder);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const deleted = async (_req: express.Request, res: express.Response) => {
  try {
    const deleted = await storeOrder.delete(_req.body.id);
    res.json(deleted);
  } catch (error) {
    res.json(error);
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
const orderRoutes = (app: express.Application) => {
  app.get('/orders', verify, index);
  app.get('/orders/id', verify, show);
  app.post('/orders', verify, create);
  app.delete('/orders', verify, deleted);
  app.post('/orders/add', verify, addingProduct);
};

export default orderRoutes;
