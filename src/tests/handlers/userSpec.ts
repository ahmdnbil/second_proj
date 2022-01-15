import app from '../../server';
import supertest from 'supertest';

const req = supertest(app);

describe('handelers user', () => {
  let tok: string;
  it('post return a token', async () => {
    //creating user for testing
    const user = {
      firstName: 'ahmed',
      lastName: 'nabil',
      password: 'ahmed123',
    };
    const res = await req.post('/users').send(user);
    tok = res.body;
    const test = tok.split('.').length;
    expect(test).toBeGreaterThan(1);
  });

  it('testing the endpoint with correct token', async () => {
    await req.get('/users').set('Authorization', `Bearer ${tok}`).expect(200);
  });

  it('testing the endpoint with user id', async () => {
    await req.get('/users/1').set('Authorization', `Bearer ${tok}`).expect(200);
  });
});
