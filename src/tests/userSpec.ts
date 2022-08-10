import { User, userStore } from '../models/user';

const store = new userStore()

describe("User Model", () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('create method should add a user', async () => {
    const random_number = Math.random();
    const result = await store.create({
      user_name: 'user'+random_number,
      password: '123456'  
    });
    expect(result.user_name).toEqual('user'+random_number);
  });
});