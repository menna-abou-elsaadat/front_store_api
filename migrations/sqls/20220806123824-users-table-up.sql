CREATE TABLE users (
    id SERIAL PRIMARY  KEY,
    user_name VARCHAR(150) unique,
    password VARCHAR(255)
);