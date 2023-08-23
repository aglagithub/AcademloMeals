//console.log('In file: user.route.js');
const express = require('express');

//controllers
const userController = require('../controllers/user.controller');

//middlewares
const authMiddleware = require('../middlewares/auth.middleware');
const userMiddleware = require('../middlewares/user.middleware');
const validationMiddleware = require('./../middlewares/validations.middleware');

const router = express.Router();

router.post(
  '/signup',
  validationMiddleware.createUserValidation,
  userController.create
);
router.post(
  '/login',
  validationMiddleware.loginUserValidaton,
  userController.login
);

router.use(authMiddleware.protect);

router.route('/').get(userController.findAll).get(userController.findOne);

router
  .use('/:id', userMiddleware.existUser)
  .route('/:id')
  .get(userController.findOne)
  .patch(
    validationMiddleware.updateUserValidation,
    authMiddleware.protectAccountOwner,
    userController.update
  )
  .delete(authMiddleware.protectAccountOwner, userController.delete);
/* router.route('/')
      .get(userController .findAll)
      .post(userController.create)

router.route('/:id')
      .get(userController .findOne)
      .patch(userController.update)
      .delete(userController  .delete)
 */

module.exports = router;
