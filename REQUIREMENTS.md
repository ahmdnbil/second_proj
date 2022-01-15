# Requirments
the mission here to create a storefront backend for manging the users,orders and products.
the order table has information from users and products tables to follow up the status of the order and users
of the website and their products and orders 

## Database Schema

|      Tabels   |   Attributes  |        type                                              |
|-------------  | ------------- |----------------------------------------------------------|
|users          |  id           |serial primary key                                        |
|               |  firstName    |VARCHAR(100)                                              |
|               |  lastName     |VARCHAR(100)                                              | 
|               |    firstName  |VARCHAR                                                   |
|               |               |                                                          |  
|products       |  id           |serial primary key                                        |
|               | name          |VARCHAR(100)                                              |
|               | price         |VARCHAR(100)                                              |
|               |               |                                                          | 
|orders         |  id           |serial primary key                                        |
|               |status         |VARCHAR                                                   |
|               |user_id        |integer, FOREIGN KEY (user_id) REFERENCES users(id)       |              
|               |               |                                                          |
|orders_products|  id           |serial primary key                                        |
|               |product_id     |BIGINT REFERENCES products(id)                            |
|               |quantity       |integer unique                                            |
|               |user_id        |integer, FOREIGN KEY (user_id) REFERENCES users(id)       |

## API endpoints

### users

|    Endpoint   |   Attributes  |        Parameters                                        |
|-------------  | ------------- |----------------------------------------------------------|
|/users         |  GET          |N/A                                                       |
|/users         |  POST         |firstName,lastName,password                               |
|/users         |  PUT          |id,firstName,lastName,password                            | 
|/users         |  DELETE       |id                                                        |
|/user/id       |  GET          |id                                                        |  


### Products

|    Endpoint   |   Attributes  |        Parameters                                        |
|-------------  | ------------- |----------------------------------------------------------|
|/products      |  GET          |N/A                                                       |
|/products      |  POST         |firstName,lastName,password                               |
|/products      |  PUT          |id,firstName,lastName,password                            | 
|/products      |  DELETE       |id                                                        |
|/products/id   |  GET          |id                                                        |

### orders

|    Endpoint   |   Attributes  |        Parameters                                        |
|-------------  | ------------- |----------------------------------------------------------|
|/orders        |  GET          |N/A                                                       |
|/orders        |  POST         |firstName,lastName,password                               |
|/orders        |  PUT          |id,firstName,lastName,password                            | 
|/orders        |  DELETE       |id                                                        |
|/orders/id     |  GET          |id                                                        |