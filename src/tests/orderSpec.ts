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

  it('create method ', async () => {
    const result = await store.create({'user_id':1});
    expect(result.user_id).toEqual(1);
  });

  it('makeItCompleted method ', async () => {
    const result = await store.makeItCompleted({'id':1});
    expect(result.completed).toEqual(true);
  });

  it('currentForUser method ', async () => {
    const result = await store.currentForUser({'user_id':1});
    expect(result).toEqual(jasmine.any(Array));
  });

  it('completedForUser method ', async () => {
    const result = await store.completedForUser({'user_id':1});
    expect(result).toEqual(jasmine.any(Array));
  });

});