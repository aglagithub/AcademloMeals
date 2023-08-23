//console.log('In File: ', __filename);
const catchAsync = require('../utils/catchAsync');
const Meal = require('../models/meal.model');

//? Create meal
exports.create = catchAsync(async (req, res, next) => {
  console.log('Meals: create');
  const { name, price } = req.body;
  const { id } = req.params;
  const restaurantId = id;
  await Meal.create({ name, price, restaurantId });

  return res.status(201).json({
    status: 'sucess',
    message: 'Meal Created',
    restaurantId: id,
    name,
    price,
  });
});

//? find all meals
exports.findAll = catchAsync(async (req, res, next) => {
  console.log('Meals: findAll');
  const meals = await Meal.findAll({
    where: {
      status: true,
    },
  });
  return res.status(200).json({
    status: 'success',
    message: 'All meals: ',
    results: meals.length,
    meals,
  });
});

//? find one meal
exports.findOne = catchAsync(async (req, res, next) => {
  console.log('Meals: findOne');
  const { meal } = req;

  return res.status(200).json({ 
    status: 'success', 
    meal });
});

//? update meal
exports.update = catchAsync(async (req, res, next) => {
  console.log('Meals: update (patch');
   const { meal } = req;
   const { name, price } = req.body;
   
   await meal.update({ name, price });

  return res
    .status(200)
    .json({ 
      status: 'success',
      message: 'meal updated',
      meal
   });
});

//? delete meal
exports.delete = catchAsync(async (req, res, next) => {
  console.log('Meals: delete');
   const { meal } = req;
   await meal.update({ status: 'false' });
  return res
    .status(200)
    .json({ 
      status: 'success',
      message: 'meal deleted',
      meal
  
  });
});
