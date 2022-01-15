import Client from '../database';

export type Order = {
  id?: number;
  user_id: number;
  status: string;
};

export type ProductOrder = {
  id?: number;
  product_id: number;
  quantity: number;
  order_id: number;
};

export class StoreOrder {
  async addingProduct(P: ProductOrder): Promise<ProductOrder[]> {
    try {
      const connection = await Client.connect();
      const query =
        'insert into orders_products (quantity,product_id,order_id) values ($1,$2,$3) returning *';
      const result = await connection.query(query, [
        P.quantity,
        P.order_id,
        P.product_id,
      ]);
      const row = result.rows[0];
      connection.release();
      return row;
    } catch (e) {
      throw new Error(
        `can't add this product ${P.product_id} to its order ${P.order_id} due to this problem ${e}`
      );
    }
  }

  async index(): Promise<Order[]> {
    try {
      const connection = await Client.connect();
      const query = 'select * from orders';
      const result = await connection.query(query);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(
        `the connection to database has been failed due to this error ${error}`
      );
    }
  }

  async show(id: number): Promise<Order> {
    try {
      const connection = await Client.connect();
      const query = 'select * from orders where id=($1)';
      const result = await connection.query(query, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `you cant show the order with id = ${id} due to this error ${error}`
      );
    }
  }

  async create(o: Order): Promise<Order> {
    try {
      const connection = await Client.connect();
      const query =
        'insert into orders (user_id,status) values ($1,$2) returning *';
      const result = await connection.query(query, [o.user_id, o.status]);
      const order = result.rows[0];
      connection.release();
      return order;
    } catch (error) {
      throw new Error(`cant add this ordre due to an error ${error}`);
    }
  }
  async delete(id: number): Promise<Order> {
    try {
      const connection = await Client.connect();
      const query = 'delete from ordres where id=($1)';
      const result = await connection.query(query, [id]);
      const order = result.rows[0];
      connection.release();
      return order;
    } catch (error) {
      throw new Error(
        `could'nt delete the order with id =${id} due to this error ${error} `
      );
    }
  }
}
