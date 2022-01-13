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
|               |product_id     |integer, FOREIGN KEY (product_id) REFERENCES products(id) |                   
|               |quantity       |integer unique                                            |
|               |user_id        |integer, FOREIGN KEY (user_id) REFERENCES users(id)       |              
|               |               |                                                          |
|orders_products|  id           |serial primary key                                        |
|               |product_id     |BIGINT REFERENCES products(id)                            |
|               |quantity       |integer unique                                            |
|               |user_id        |integer, FOREIGN KEY (user_id) REFERENCES users(id)       |

