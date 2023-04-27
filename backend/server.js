const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const productsRouter = require('./routes/productsRoutes')
const commentsRouter = require('./routes/commentsRoutes')
const usersRouter = require('./routes/usersRoutes')
const ordersRouter = require('./routes/ordersRoutes')
const offsRouter = require('./routes/offsRoutes')
const adminsRouter = require('./routes/adminsRoutes')

const app = express();

app.use(cors());
app.use(bodyParser.json());
// app.use(function(req, res, next) {
//     // set the Access-Control-Allow-Origin header to allow requests from any domain
//     res.header("Access-Control-Allow-Origin", "*");
//     // set the Access-Control-Allow-Methods header to allow the HTTP methods GET, POST, PUT, and DELETE
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//     // set the Access-Control-Allow-Headers header to allow the Content-Type header to be sent
//     res.header("Access-Control-Allow-Headers", "Content-Type");
//     next();
//   });
  
//   // route to handle GET requests to /api/products
//   app.get('/api/products', function(req, res) {
//     // handle the GET request here and send a response to the client
//   });

app.use('/api/products', productsRouter)
app.use('/api/comments', commentsRouter)
app.use('/api/users', usersRouter)
app.use('/api/orders', ordersRouter)
app.use('/api/offs', offsRouter)
app.use('/api/admins', adminsRouter)

app.listen(8000, () => console.log('Server Run On 8000 Port'));
