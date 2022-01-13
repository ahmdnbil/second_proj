import Client from '../database';

export type Product = {
  id?: number;
  name: string;
  price: string;
};

export class StoreProduct {
  async index(): Promise<Product[]> {
    try {
      const connection = await Client.connect();
      const query = 'select * from products';
      const result = await connection.query(query);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(
        `the connection to database has been failed due to this error ${error}`
      );
    }
  }

  async show(id: number): Promise<Product> {
    try {
      const connection = await Client.connect();
      const query = 'select * from products where id=($1)';
      const result = await connection.query(query, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `you cant show the product with id = ${id} due to this error ${error}`
      );
    }
  }

  async create(p: Product): Promise<Product> {
    try {
      const connection = await Client.connect();
      const query =
        'insert into products (name,price) values ($1,$2) returning *';
      const result = await connection.query(query, [p.name, p.price]);
      const product = result.rows[0];
      connection.release();
      return product;
    } catch (error) {
      throw new Error(`cant add this product due to an error ${error}`);
    }
  }
  async delete(id: number): Promise<Product> {
    try {
      const connection = await Client.connect();
      const query = 'delete from products where id=($1)';
      const result = await connection.query(query, [id]);
      const product = result.rows[0];
      connection.release();
      return product;
    } catch (error) {
      throw new Error(
        `could'nt delete the product with id =${id} due to this error ${error} `
      );
    }
  }
}
