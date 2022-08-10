import Client from '../database';

export type Product = {
  id?: number;
  name: string;
  price: number;
};

export class productStore {
  async index(): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const sql = 'select * from products ';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(
        `Could not get products. Error: ${(err as Error).message}`
      );
    }
  }

  async show(id: number): Promise<Product> {
    try {
      const conn = await Client.connect();
      const sql = 'select * from products where id = $1';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not find product ${id}. Error: ${(err as Error).message}`
      );
    }
  }

  async create(u: Product): Promise<Product> {
    try {
      const conn = await Client.connect();
      const sql = 'INSERT INTO products (name ,price) VALUES($1, $2) RETURNING *';
      const result = await conn.query(sql, [u.name, u.price]);
      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`unable create product (${u.name}): ${err}`);
    }
  }
}
