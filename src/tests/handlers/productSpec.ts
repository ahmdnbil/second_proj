import app from '../../server';
import supertest from 'supertest';

const req = supertest(app);

describe('handelers product', () => {
  let tok: string;
  it('post return a token', async () => {
    const product = {
      name: 'PS5',
      price: '300$',
    };
    const res = await req
      .post('/products')
      .send(product)
      .set('Authorization', `Bearer ${tok}`);
    tok = res.body;
    const name = res.body.name;
    console.log(name);
    expect(name).toEqual('PS5');
  });

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
