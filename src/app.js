const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

//console.log('In File: ', __filename);

//Importación código Manejo de errores
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/error.controller');

// Importación routes
const userRoutes = require('./routes/user.routes');
const restaurantRoutes = require('./routes/restaurant.routes');
const mealRoutes = require('./routes/meal.routes');
const orderRoutes = require('./routes/order.routes');

const app = express();
const routes = {
  users: '/api/v1/users',
  restaurants: '/api/v1/restaurants',
  reviews: '/api/v1/restaurants/reviews',
  meals: '/api/v1/meals',
  orders: '/api/v1/orders',
};
//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

//routes
app.use(routes.users, userRoutes);
app.use(routes.restaurants, restaurantRoutes);
app.use(routes.meals, mealRoutes);
app.use(routes.orders, orderRoutes);

//captura de rutas inexistentes
app.all('*', (req, res, next) => {
  console.log('Not Existing route');
  return next(
    new AppError(`!Can´t find ${req.originalUrl} on This server!`, 404)
  );
});

//Middleware para manejo centralizado de errores
app.use(globalErrorHandler);

module.exports = app;
