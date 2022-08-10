import { Order, orderStore } from '../models/order';

const store = new orderStore()

describe("Product Model", () => {
  it('should have an index method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.makeItCompleted).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.currentForUser).toBeDefined();
  });

});