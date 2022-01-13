CREATE TABLE orders (
    id serial PRIMARY KEY,
    product_id INTEGER,
    FOREIGN KEY (product_id) REFERENCES products(id),
    quantity INTEGER,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id),
    status VARCHAR(100)
)