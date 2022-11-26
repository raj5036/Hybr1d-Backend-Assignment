## Hybr1d Backend Assignment

### Run this project locally: 
This project was developed with node version 14.16.0 and npm version 6.14.11
This project has used MongoDb to store & fetch the corresponding data, so make sure its installed in your local system. 
To run this project clone this Github repo locally and run**"npm install"**.

### API-CURLs this project has been tested with:  

Register new user
```
curl --location --request POST 'http://localhost:3001/api/auth/register' \
--header 'Content-Type: application/json' \
--data-raw '{
  "firstname": "Raj",
  "lastname": "Seller",
  "username": "raj+seller1@kommunicate.io",
  "password": "djkskfs",
  "type": "SELLER"
}'
```
Login existing user
```
curl --location --request POST 'http://localhost:3001/api/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
   "username": "raj+seller@kommunicate.io",
  "password": "djkskfs"
}'
```

Seller - Create catalog 
```
curl --location --request POST 'http://localhost:3001/api/seller/create-catalog' \
--header 'Authorization: {{seller-auth-token}}' \
--header 'Content-Type: application/json' \
--data-raw '{
    "products": [
        {
            "name": "shampoo",
            "price": 222,
            "no_of_units_available": 2312
        },
        {
            "name": "pens",
            "price": 3534,
            "avatar": "https://m.media-amazon.com/images/I/71ziJZFHZ6L._SL1000_.jpg",
            "no_of_units_available": 32
        }
    ]
}'
```
Seller - Get list of orders
```
curl --location --request GET 'http://localhost:3001/api/seller/orders' \
--header 'Authorization: {{seller-auth-token}}'
```
Buyer - Get list of Seller
```
curl --location --request GET 'http://localhost:3001/api/buyer/list-of-sellers' \
--header 'Authorization: {{buyer-auth-token}}'
```

Buyer - Get catalog of a Seller
```
curl --location --request GET 'http://localhost:3001/api/buyer/seller-catalog/6381d8c4ab946653bd49e614' \
--header 'Authorization: {{buyer-auth-token}}'
```

Buyer - Create order
```
curl --location --request POST 'http://localhost:3001/api/buyer/create-order/6381d8c4ab946653bd49e614' \
--header 'Authorization: {{buyer-auth-token}}' \
--header 'Content-Type: application/json' \
--data-raw '{
    "products": [
        {
            "product_id": "6b70fbc8-4db1-47d1-80b0-ddf056c5ef3e",
            "units_required": 2
        },
        {
            "product_id": "d923dae6-5cf1-4a94-8abd-93637321a6a8",
            "units_required": 1
        }
    ]
}'
```