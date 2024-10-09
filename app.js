var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Usuarios Carros',
      version: '1.0.0',
      description: 'API para manejar la relación entre usuarios y carros',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor local'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT', // Puedes especificar el formato, opcional
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js'], // Ruta donde están definidas tus rutas de Express
};


var indexRouter = require('./routes/index');
var createUserRouter = require('./routes/createUser');
var loginRouter = require('./routes/login');
var addUserCarRouter = require('./routes/addUserCar');
var getCarsByIdRouter = require('./routes/getCarsById');
var updateSellCar = require('./routes/sellCar');
var deleteCarsById = require('./routes/deleteCar');
var getUsuarios = require('./routes/getUser');
var getCars = require('./routes/getCars');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.use('/', indexRouter);
app.use('/create-user', createUserRouter);
app.use('/login', loginRouter);
app.use('/add-car-user', addUserCarRouter);
app.use('/get-carsById', getCarsByIdRouter)
app.use('/update-owner', updateSellCar);
app.use('/delete-carById', deleteCarsById);
app.use('/getUsers', getUsuarios);
app.use('/get-cars',getCars)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
