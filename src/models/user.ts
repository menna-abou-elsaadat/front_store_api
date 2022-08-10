import Client from '../database';
import bcrypt from 'bcrypt';

const pepper = process.env.BCRYPT_PASSWORD;
const salt = process.env.SALT_ROUNDS;
export type User = {
  id?: number;
  user_name: string;
  password: string;
};

export class userStore {
  async index(): Promise<User[]> {
    try {
      const conn = await Client.connect();
      const sql = 'select * from users ';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${(err as Error).message}`);
    }
  }

  async show(id: number): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql = 'select * from users where id = $1';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not find user ${id}. Error: ${(err as Error).message}`
      );
    }
  }

  async create(u: User): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql =
        'INSERT INTO users (user_name ,password) VALUES($1, $2) RETURNING *';
      const hash = bcrypt.hashSync(
        u.password + pepper,
        parseInt(salt as string)
      );

      const result = await conn.query(sql, [u.user_name, hash]);
      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`unable create user (${u.user_name}): ${err}`);
    }
  }

  async authenticate(
    user_name: string,
    password: string
  ): Promise<User | null> {
    const conn = await Client.connect();
    const sql = 'SELECT password FROM users WHERE user_name=($1)';

    const result = await conn.query(sql, [user_name]);

    console.log(password + pepper);

    if (result.rows.length) {
      const user = result.rows[0];

      console.log(user);

      if (bcrypt.compareSync(password + pepper, user.password)) {
        return user;
      }
    }

    return null;
  }
}
