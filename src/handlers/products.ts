import express from 'express';
import { Product, StoreProduct } from '../models/products';
import jwt from 'jsonwebtoken';

const storeProduct = new StoreProduct();

const index = async (_req: express.Request, res: express.Response) => {
  try {
    const products = await storeProduct.index();
    res.json(products);
  } catch (e) {
    res.json(e);
  }
};

const show = async (_req: express.Request, res: express.Response) => {
  try {
    const product = await storeProduct.show(_req.body.id);
    res.json(product);
  } catch (e) {
    res.json(e);
  }
};

const create = async (_req: express.Request, res: express.Response) => {
  const product: Product = {
    name: _req.body.name,
    price: _req.body.price,
  };
  try {
    const newProduct = await storeProduct.create(product);
    res.json(newProduct);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const deleted = async (_req: express.Request, res: express.Response) => {
  try {
    const deleted = await storeProduct.delete(_req.body.id);
    res.json(deleted);
  } catch (e) {
    res.json(e);
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

const productRoutes = (app: express.Application) => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products', verify, create);
  app.delete('/products', verify, deleted);
};

export default productRoutes;
