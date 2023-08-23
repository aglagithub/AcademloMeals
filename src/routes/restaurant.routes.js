//console.log('In restaurant.route.js');
const express = require('express');

//controllers
const restaurantController = require('../controllers/restaurant.controller');
const reviewController = require('../controllers/review.controller');

//middlewares
const authMiddleware = require('./../middlewares/auth.middleware');
const validationMiddleware = require('./../middlewares/validations.middleware');
const restaurantMiddleware = require('./../middlewares/restaurant.middleware');
const reviewMiddleware = require('./../middlewares/review.middleware');

const router = express.Router();

router.use(authMiddleware.protect);

router
  .route('/')
  .get(restaurantController.findAll)
  .post( 
    authMiddleware.protect,
    authMiddleware.restricTo('admin'),
    validationMiddleware.createRestaurantValidation,
    restaurantController.create
  );

router
  .route('/:id')
  .get(restaurantMiddleware.existRestaurant, restaurantController.findOne)
  .patch(
    restaurantMiddleware.existRestaurant,
    authMiddleware.protect,
    authMiddleware.restricTo('admin'),
    validationMiddleware.updateRestaurantValidation,
    restaurantController.update
  )
  .delete(
    restaurantMiddleware.existRestaurant,
    authMiddleware.protect,
    authMiddleware.restricTo('admin'),
    restaurantController.delete
  );

//Restaurant review routes
router.use(authMiddleware.protect);

router.post(
  '/reviews/:id',
  restaurantMiddleware.existRestaurant,
  reviewController.create
);

router
  .use(
    '/reviews/:restaurantId/:id',
    reviewMiddleware.existReview,
    restaurantMiddleware.existRestaurant
  )
  .route('/reviews/:restaurantId/:id')
  .patch(authMiddleware.protectAccountOwner, reviewController.update)
  .delete(authMiddleware.protectAccountOwner, reviewController.delete);

module.exports = router; 
