import app from '../../server';
import supertest from 'supertest';

const req = supertest(app);

describe('handelers product', () => {
  let tok: string;
  it('post return a token', async () => {
    //first of all we create user
    const user = {
      firstName: 'ahmed4',
      lastName: 'nabil7',
      password: 'passadfasfdf',
    };

    const response = await req
      .get('/users')
      .send(user)
      .set('Authorization', `Bearer ${tok}`);
    tok = response.body;
    //creating product for testing
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
