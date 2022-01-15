import { StoreUser } from '../../models/users';

const storeUser = new StoreUser();

describe('User model', () => {
  it('having create method', () => {
    expect(storeUser.create).toBeDefined();
  });
  it('having delete method', () => {
    expect(storeUser.delete).toBeDefined();
  });
  it('having index method', () => {
    expect(storeUser.index).toBeDefined();
  });
  it('having show method', () => {
    expect(storeUser.show).toBeDefined();
  });
  it('having authenticate method', () => {
    expect(storeUser.authenticate).toBeDefined();
  });
  it('create method to add user', async () => {
    // const product: Product = { name: 'TV', price: '50$' };
    // const result = await storeProduct.create(product);

    const user = await storeUser.create({
      firstName: 'ahmed',
      lastName: 'mohamed',
      password: '2345hr',
    });

    expect(user.password).not.toEqual('2345hr');
  });
  it('show method to show the User', async () => {
    const result = await storeUser.show(2);
    expect(result.password).not.toEqual('2345hr');
  });
  it('index method to show all products', async () => {
    const result = await storeUser.index();
    expect(result.length).toEqual(3);
  });
});
