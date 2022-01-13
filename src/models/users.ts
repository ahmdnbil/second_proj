import Client from '../database';
import bcrypt from 'bcrypt';

const saltRounds = process.env.SALT_ROUNDS;
const pepper = process.env.BCRYPT_PASSWORD;

export type User = {
  id?: number;
  firstName: string;
  lastName: string;
  password: string;
};

export class StoreUser {
  async index(): Promise<User[]> {
    try {
      const connection = await Client.connect();
      const query = 'select * from users';
      const result = await connection.query(query);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(
        `the connection to database has been failed due to this error ${error}`
      );
    }
  }

  async show(id: number): Promise<User> {
    try {
      const connection = await Client.connect();
      const query = 'select * from users where id=($1)';
      const result = await connection.query(query, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `you cant show the user with id = ${id} due to this error ${error}`
      );
    }
  }

  async create(u: User): Promise<User> {
    try {
      const connection = await Client.connect();
      const query =
        'insert into users (firstName,lastName,password) values ($1,$2,$3) returning *';
      const hashing = bcrypt.hashSync(
        u.password + pepper,
        parseInt(saltRounds as string)
      );
      const result = await connection.query(query, [
        u.firstName,
        u.lastName,
        hashing,
      ]);
      const user = result.rows[0];
      connection.release();
      return user;
    } catch (error) {
      throw new Error(
        `cant add this user ${
          u.firstName + ' ' + u.lastName
        } due to an error ${error}`
      );
    }
  }
  async delete(id: number): Promise<User> {
    try {
      const connection = await Client.connect();
      const query = 'delete from users where id=($1)';
      const result = await connection.query(query, [id]);
      const user = result.rows[0];
      connection.release();
      return user;
    } catch (error) {
      throw new Error(
        `could'nt delete the user with id =${id} due to this error ${error} `
      );
    }
  }

  async authenticate(
    firstName: string,
    lastName: string,
    password: string
  ): Promise<User | null> {
    const conn = await Client.connect();
    const query =
      'select password from users where firstName =($1) and lastName = ($2)';

    const result = await conn.query(query, [firstName, lastName]);
    if (result.rows.length) {
      const user = result.rows[0];
      if (bcrypt.compareSync(password + pepper, user.password)) {
        return user;
      }
    }
    return null;
  }
}
