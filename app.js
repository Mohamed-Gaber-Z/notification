const express = require('express');
const bodyparser = require('body-parser');
const multer = require('multer')
const path = require('path');
const helmet = require('helmet');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express')

const {mongoose} = require('./db/mongoose');
const userRoutes = require('./routes/user');
const shopRoutes = require('./routes/shop');
const countryRoutes = require('./routes/address/country');
const cityRoutes = require('./routes/address/city');
const notiRoutes = require('./routes/notification');
const thenearestRoutes = require('./routes/thenearest');

const app = express();
const port = process.env.PORT || 3000;
// var swaggerDefinition = {
//   info: {
//     title: 'Node Swagger API',
//     version: '1.3.0',
//     description: 'Demonstrating how to desribe a RESTful API with Swagger',
//   },
//   host: 'localhost:3000',
//   basePath: '/',
// };
//
// // options for the swagger docs
// var options = {
//   // import swaggerDefinitions
//   swaggerDefinition: swaggerDefinition,
//   // path to the API docs
//   apis: ['./routes/user.js'],
// };
//
// // initialize swagger-jsdoc
// var swaggerSpec = swaggerJSDoc(options);
//
// app.get('/json', function (req, res) {
//   res.setHeader('Content-Type','form-data/json')
//   res.send(swaggerSpec)
// })

//app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec))


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/', userRoutes);
app.use('/shop', shopRoutes);
app.use('/country', countryRoutes);
app.use('/city', cityRoutes);
app.use('/notification', notiRoutes);
app.use('/thenearest', thenearestRoutes);

app.use((req, res, next) => {
  try {
    console.log(req.url);
    throw new Error('Page Not found'); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  } catch(e) {
    console.log(e);
    next(e)
  }
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({error: err.message})
});

app.listen(port, () => {
  console.log(`Server started up on port ${port}`);
})
