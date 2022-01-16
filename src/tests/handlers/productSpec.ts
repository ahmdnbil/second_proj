import app from '../../server';
import supertest from 'supertest';

const req = supertest(app);

describe('handelers product', () => {
  let tok: string;
  it('testing the endpoint with correct token', async () => {
    await req
      .get('/products')
      .set('Authorization', `Bearer ${tok}`)
      .expect(200);
  });

  it('testing the endpoint with product id', async () => {
    await req
      .get('/products/1')
      .set('Authorization', `Bearer ${tok}`)
      .expect(200);
  });
});
