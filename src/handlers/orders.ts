import express from 'express';
import { ProductOrder, Order, StoreOrder } from '../models/orders';

const storeOrder = new StoreOrder();

const index = async (_req: express.Request, res: express.Response) => {
  const orders = await storeOrder.index();
  res.json(orders);
};

const show = async (_req: express.Request, res: express.Response) => {
  const product = await storeOrder.show(_req.body.id);
  res.json(product);
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
  app.post('/orders/add', addingProduct);
};

export default orderRoutes;
