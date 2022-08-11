import { Order, orderStore } from '../models/order';
import { User, userStore } from '../models/user';

const user_store = new userStore()
const store = new orderStore()

describe("Order Model", () => {
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
    const random_number = Math.random();
    const create_user = await user_store.create({
      user_name: 'user'+random_number,
      password: '123456'  
    });
    const result = await store.create({'user_id':create_user.id});
    expect(result.user_id).toEqual(create_user.id);
  });

  it('makeItCompleted method ', async () => {
    const random_number = Math.random();
    const create_user = await user_store.create({
      user_name: 'user'+random_number,
      password: '123456'  
    });
    const create_order = await store.create({'user_id':create_user.id});
    const result = await store.makeItCompleted({'id':create_order.id});
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