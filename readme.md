# Storefront Backend Project

## Getting Started

- To get started, clone this repo and run `npm run build` in your terminal at the project root.

- you have to have a .env file in the repo, it has to contain the following variables
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=store_front
POSTGRES_TEST_DB=store_front_test
POSTGRES_USER=postgres
POSTGRES_PASSWORD=123456

BCRYPT_PASSWORD = password
SALT_ROUNDS = 10
SECRET_TOKEN = secret

ENV=dev

- you have to create two databases with the value you set in POSTGRES_DB, POSTGRES_TEST_DB, this is an example for the SQL needed when connected to psql
`
CREATE USER username123 WITH PASSWORD 'password123';    
CREATE DATABASE store_front;  
\c store_front
GRANT ALL PRIVILEGES ON DATABASE store_front TO username123;
CREATE DATABASE store_front_test;
\c store_front_test
GRANT ALL PRIVILEGES ON DATABASE store_front_test TO username123;
`

## Overview


### 1.  DB Creation and Migrations

- to run migrations up on dev environment run `db-migrate up`, to run migrations down it run `db-migrate reset`
- to create a new migration run :db-migrate create todos --sql-file

### 2. database schema
#### Product
-  id  (serial)
- name (varchar)
- price (integer)

#### User
- id  (serial)
- username (varchar)
- password  (varchar)

#### Orders
- id (serial)
- user_id (integer)
- completed (boolean)

#### Order_products
- id (serial)
- order_id (integer)
- product_id (integer)
- product_quantity (integer)

#### Command lines
- use 'npm run start'   to start project on post 3000
- use 'npm run test' to run tests on test database

#### Endpoints

#### user Endpoints

-/users  (method:get)(request header bearer_token : token)(to retrieve all users)

-/users/{id} (method:get)(request header bearer_token : token(to retrieve specific user with give id)

-/users (method:post)(request body:{'user_name' :'user', 'password':'123456'})(to create a new user and a token will be returned )

-/users/authenticate (method:post)(request body: {'user_id':user_id})(to get a token for that user)

#### product Endpoints

-/products (method:get)(request header bearer_token : token)(to retrieve all products)

-/products/{id} (method:get)(request header bearer_token : token(to retrieve specific product with give id)

-/products (method:post)(request header bearer_token : token)(request body:{'name' :'product name', 'price':12})(to create a new product )

#### order Endpoints

-/orders (method:post)(request header bearer_token : token)(request body:{'user_id' :1})(to create a new order for user_id = 1 )

-/orders/add_product (method:post)(request header bearer_token : token)(request body:{'order_id' :1,'product_id'=1})(to add product whose id = 1 to order whose id = 1 )

-/orders/complete_order (method:post)(request header bearer_token : token)(request body:{'order_id' :1})(to make order with id = 1 completed )

-/orders/current (method:post)(request header bearer_token : token)(request body:{'user_id' :1})(to retrieve all uncompleted orders form user whose id = 1 )

-/orders/completed (method:post)(request header bearer_token : token)(request body:{'user_id' :1})(to retrieve all completed orders form user whose id = 1 )

### Local host ports
-for the database, port is  5432
-server is running on port 3000

