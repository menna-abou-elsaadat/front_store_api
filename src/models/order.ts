import Client from '../database';

export type Order = {
    id?: number;
    user_id?: number;
    completed?: boolean;
  };

  export class orderStore {

    async create(u: Order): Promise<Order> {
        try {
          const conn = await Client.connect();
          const sql = 'INSERT INTO orders (user_id) VALUES($1) RETURNING *';
          const result = await conn.query(sql, [u.user_id]);
          const order = result.rows[0];
          conn.release();
          return order;
        } catch (err) {
          throw new Error(`unable create order (${u.user_id}): ${err}`);
        }
      }
    async makeItCompleted(u: Order): Promise<Order>{
      try {
        const conn = await Client.connect();
        const sql = 'update orders set completed = true where id = $1 RETURNING *';
        const result = await conn.query(sql, [u.id]);
        const order = result.rows[0];
        conn.release();
        return order;
      } catch (err) {
        throw new Error(`unable to complete order (${u.id}): ${err}`);
      }
    }

    async currentForUser(u: Order): Promise<Order[]>{
      try {
        const conn = await Client.connect();
        const sql = 'select * from orders where user_id = $1 and completed = false';
        const result = await conn.query(sql, [u.user_id]);
        const order = result.rows;
        conn.release();
        console.log(order);
        return order;
      } catch (err) {
        throw new Error(`unable to fetch current orders for (${u.user_id}): ${err}`);
      }
    }
    async completedForUser(u: Order): Promise<Order[]>{
      try {
        const conn = await Client.connect();
        const sql = 'select * from orders where user_id = $1 and completed = true';
        const result = await conn.query(sql, [u.user_id]);
        const order = result.rows;
        conn.release();
        console.log(order);
        return order;
      } catch (err) {
        throw new Error(`unable to fetch current orders for (${u.user_id}): ${err}`);
      }
    }

    
  }