CREATE TABLE orders_products (
    id serial PRIMARY KEY,
    product_id BIGINT REFERENCES products(id),
quantity INTEGER,
    order_id BIGINT REFERENCES orders(id)
);