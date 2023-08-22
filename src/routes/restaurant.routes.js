console.log('In restaurant.route.js');
const express = require('express');

//controllers
const restaurantController = require('../controllers/restaurant.controller');

//middlewares
const authMiddleware = require('./../middlewares/auth.middleware');
const restaurantMiddleware = require('./../middlewares/restaurant.middleware');
const validationMiddleware = require('./../middlewares/validations.middleware');

const router = express.Router();

router.use(authMiddleware.protect);

router
  .route('/')
  .get(restaurantController.findAll)
  .post(validationMiddleware.createRestaurantValidation, restaurantController.create);

router
  .use('/:id', restaurantMiddleware.existRestaurant)
  .route('/:id')
  .get(restaurantController.findOne)
  .patch(
    validationMiddleware.updateRestaurantValidation,
    restaurantController.update
  )
  .delete(
    restaurantController.delete
  );

module.exports = router;
