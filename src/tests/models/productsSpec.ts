import { StoreProduct } from '../../models/products';

const storeProduct = new StoreProduct();

describe('product model', () => {
  it('having create method', () => {
    expect(storeProduct.create).toBeDefined();
  });
  it('having delete method', () => {
    expect(storeProduct.delete).toBeDefined();
  });
  it('having index method', () => {
    expect(storeProduct.index).toBeDefined();
  });
  it('having show method', () => {
    expect(storeProduct.show).toBeDefined();
  });

  it('create method to add product', async () => {
    const product = await storeProduct.create({ name: 'TV', price: '50$' });

    expect(product).toEqual({
      id: 3,
      name: 'TV',
      price: '50$',
    });
  });
  it('show method to show the product', async () => {
    const result = await storeProduct.show(3);
    expect(result).toEqual({
      id: 3,
      name: 'TV',
      price: '50$',
    });
  });
  it('index method to show all products', async () => {
    const result = await storeProduct.index();
    expect(result.length).toEqual(3);
  });
});
