import { StoreOrder } from '../../models/orders';
import { StoreProduct } from '../../models/products';
import { StoreUser } from '../../models/users';

const storeOrder = new StoreOrder();
const storeProduct = new StoreProduct();
const storeUser = new StoreUser();

describe('Order model', () => {
  it('having create method', () => {
    expect(storeOrder.create).toBeDefined();
  });
  it('having delete method', () => {
    expect(storeOrder.delete).toBeDefined();
  });
  it('having index method', () => {
    expect(storeOrder.index).toBeDefined();
  });
  it('having show method', () => {
    expect(storeOrder.show).toBeDefined();
  });
  it('having adding procuct-order method', () => {
    expect(storeOrder.addingProduct).toBeDefined();
  });

  it('create method to add order', async () => {
    await storeUser.create({
      firstName: 'ahmed',
      lastName: 'nabil',
      password: '6565hr',
    });
    await storeProduct.create({ name: 'PC', price: '40$' });
    const order = await storeOrder.create({
      product_id: 1,
      quantity: 2,
      status: 'active',
      user_id: 1,
    });

    expect(order).toEqual({
      id: 1,
      product_id: 1,
      quantity: 2,
      status: 'active',
      user_id: 1,
    });
  });
  it('show method to show the product', async () => {
    const result = await storeOrder.show(1);
    expect(result).toEqual({
      id: 1,
      product_id: 1,
      quantity: 2,
      status: 'active',
      user_id: 1,
    });
  });
  it('index method to show all orders', async () => {
    const result = await storeOrder.index();
    expect(result.length).toEqual(1);
  });
});
