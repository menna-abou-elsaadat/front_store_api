import Client from '../database';

export type OrderProduct = {
    id?: number;
    order_id: number;
    product_id: number;
    product_quantity: number;
  };

  export class orderProductStore {
    async create(u: OrderProduct): Promise<OrderProduct> {
      try {
        const conn = await Client.connect();
        const sql = 'INSERT INTO order_products (order_id,product_id,product_quantity) VALUES($1,$2,$3) RETURNING *';
        const result = await conn.query(sql, [u.order_id,u.product_id,u.product_quantity]);
        const orderProduct = result.rows[0];
  
        conn.release();
  
        return orderProduct;
      } catch (err) {
        throw new Error(`unable create order_product (${u.product_id}): ${err}`);
      }
    }
  }