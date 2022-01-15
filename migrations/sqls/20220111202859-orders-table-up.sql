CREATE TABLE orders (
id serial PRIMARY KEY,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id),
    status VARCHAR(100)
)