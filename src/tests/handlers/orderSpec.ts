import app from '../../server';
import supertest from 'supertest';

const req = supertest(app);

describe('handelers-orders', () => {
  let tok: string;

  it('testing the endpoint with product id', async () => {
    //this will not return nothing cuz we haven't create any user yet
    await req
      .get('/orders/1')
      .set('Authorization', `Bearer ${tok}`)
      .expect(404);
  });
});
