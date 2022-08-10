import { Product, productStore } from '../models/product';

const store = new productStore()

describe("Product Model", () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });
  it('create method should add a product', async () => {
    const result = await store.create({
      name: 'product',
      price: 12  
    });
    expect(result.name).toEqual('product');
    expect(result.price).toEqual(12);
  });
  it('index method ', async () => {
    const result = await store.index();
    expect(result.length).toBeGreaterThan(0);
  });

  it('show method ', async () => {
    const result = await store.show(1);
    expect(result).toEqual(jasmine.any(Object));
  });
});