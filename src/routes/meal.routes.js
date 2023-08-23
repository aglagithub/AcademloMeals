//console.log('In meal.route.js');
const express = require('express');

//controllers
const mealController = require('../controllers/meal.controller');

//middlewares
const authMiddleware = require('./../middlewares/auth.middleware');
const validationMiddleware = require('./../middlewares/validations.middleware');
const mealMiddleWare = require('./../middlewares/meal.middleware'); //colocar en rutas con /:id de meal
const restaurantMiddleWare = require('./../middlewares/restaurant.middleware'); //colocar en rutas con /:id de restaurante

const router = express.Router();

//Rutas sin protección
router.route('/').get(mealController.findAll);
router.route('/:id').get(mealMiddleWare.existMeal,mealController.findOne);

//rutas protegidas
router
  .route('/:id')
  .post(restaurantMiddleWare.existRestaurant, mealController.create);

router.route('/:id').patch(mealMiddleWare.existMeal, mealController.update);
router.route('/:id').delete(mealMiddleWare.existMeal, mealController.delete); 


module.exports = router;
