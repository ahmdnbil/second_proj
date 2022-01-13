import express from 'express';
import { Order, StoreOrder } from '../models/orders';

const storeOrder = new StoreOrder();

const index = async (_req: express.Request, res: express.Response) => {
  const orders = await storeOrder.index();
  res.json(orders);
};

const show = async (_req: express.Request, res: express.Response) => {
  const product = await storeOrder.show(_req.body.id);
  res.json(product);
};

const create = async (_req: express.Request, res: express.Response) => {
  const order: Order = {
    product_id: _req.body.product_id,
    quantity: _req.body.quantity,
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
  const deleted = await storeOrder.delete(_req.body.id);
  res.json(deleted);
};

const orderRoutes = (app: express.Application) => {
  app.get('/orders', index);
  app.get('/orders/{:id}', show);
  app.post('/orders', create);
  app.delete('/orders', deleted);
};

export default orderRoutes;
