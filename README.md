# Redis-and-Node.js-expressjs-example
Storing data in redis using expressjs displaying data from redis

# Prerequisite
- You need to have Node.js, Redis-server installed in your local system to run this code
https://nodejs.org/en/download/ 
https://github.com/ServiceStack/redis-windows

#To run code 
You need to clone this repository then do

``npm install``

Run server

``nodemon server.js``

Test way

call input part.
Use postman call localhost:3000/input post api.
in post man set body raw json text.
for example {"number": 10}
Check the ticket number return same for same number.

Use Postman call localhost:3000/output?ticket=xxx get api.
check for exist and non exist ticket.
and for exist ticket check the fibonacci value is correct.
