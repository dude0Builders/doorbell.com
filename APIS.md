# USER API

### Create User ( Development in progress will be changed/updated )

URL: http://<domain-name>/user/create 
METHOD: POST
HEADERS: 
Content-Type: Application/json
DATA: {
        "username":"<username>",
        "password":"<password>"
      }

### Login 

URL: http://<domain-name>/user/create 
METHOD: POST
HEADERS:
Content-Type: Application/json
DATA: {
        "username":"<username>",
        "password":"<password>"
      }

### Update User 

URL: http://<domain-name>/user/:userid
METHOD: PUT
HEADERS: 
Authorization: Bearer <Token>,  `Token will be received after successfull login and sign up`
Content-Type: Application/json
DATA: {
        <to-be-change-field>: <new-value>
      }


# Product API

### Product List
URL: http://<domain-name>/productlist
METHOD: GET
HEADERS:
Authorization: Bearer <Token>,  `Token will be received after successfull login and sign up`


### Product Details
URL: http://<domain-name>/product/:productid
METHOD: GET
HEADERS:
Authorization: Bearer <Token>,  `Token will be received after successfull login and sign up`


### Create Product ( Only for Merchant and Admins still in development )
URL: http://<domain-name>/product/:productid
METHOD: POST
HEADERS:
Authorization: Bearer <Token>,  `Token will be received after successfull login and sign up`
Content-Type: Application/json
DATA: {
        "name":"<name>" ,
        "detail":"<product-details>",
        "type":"<type>",  `value should be object id of the product type Look for product Type API for more details`
        "price":<price>
    }


### Update Product
URL: http://<domain-name>/product/:productid
METHOD: PUT
HEADERS:
Authorization: Bearer <Token>,  `Token will be received after successfull login and sign up`
Content-Type: Application/json
DATA: {
        <field-to-be-changed>:<new-value>
    }


## Product API 

### Create Product Type ( Only for Merchants and Admins still in development )
URL: http://<domain-name>/productType/create
METHOD: POST
HEADERS: 
Authorization: Bearer <Token>,  `Token will be received after successfull login and sign up`
Content-Type: Application/json
DATA: {
        "type":"<typename>"
    }


### Get Product Type ( only for Merchants and Admins Still in Development )
URL: http://<domain-name>/productType/list
METHOD: GET
HEADERS: 
Authorization: Bearer <Token>,  `Token will be received after successfull login and sign up`


# ORDER API 
### Create Order
URL: http://<domain-name>/order/create
METHOD: POST
HEADERS:
Authorization: Bearer <Token>,  `Token will be received after successfull login and sign up`
Content-Type: Application/json
DATA: {
         "userid":"<userid>",
         "productid":"<productid>",
         "date":"<date-time YYYY-MM-DD HH:mm:SS Z>",
         "quantity":<quantity>,
         "merchantid":"<merchantid>"
    }


### Get Order Details
URL: http://<domain-name>/order/:orderid
METHOD: GET
HEADERS:
Authorization: Bearer <Token>,  `Token will be received after successfull login and sign up`


### Update Order Details
URL: http://<domain-name>/order/:orderid
METHOD: PUT
HEADERS:
Authorization: Bearer <Token>,  `Token will be received after successfull login and sign up`
Content-Type: Application/json
DATA : {
        <fields-to-be-changed>:<value>
     }

