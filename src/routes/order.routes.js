//console.log("In order.route.js")
const express = require('express');

//controllers
const orderController = require('../controllers/order.controller');
//middlewares
const authMiddleware = require('./../middlewares/auth.middleware');
const validationMiddleware = require('./../middlewares/validations.middleware');
const orderMiddleware = require('./../middlewares/order.middleware')

const router = express.Router();

router.route('/').post(orderController.create)
router.route('/:me').get(orderController.findAll);
     

router
  .route('/:id')
  .patch(orderMiddleware.existOrder, orderController.update)
  .delete(orderMiddleware.existOrder, orderController.delete);

module.exports = router