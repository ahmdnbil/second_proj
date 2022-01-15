import express from 'express';
import { Product, StoreProduct } from '../models/products';

const storeProduct = new StoreProduct();

const index = async (_req: express.Request, res: express.Response) => {
  const products = await storeProduct.index();
  res.json(products);
};

const show = async (_req: express.Request, res: express.Response) => {
  const product = await storeProduct.show(_req.body.id);
  res.json(product);
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
  const deleted = await storeProduct.delete(_req.body.id);
  res.json(deleted);
};

const productRoutes = (app: express.Application) => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products', create);
  app.delete('/products', deleted);
};

export default productRoutes;
