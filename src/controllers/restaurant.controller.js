console.log('In File: ', __filename);

const catchAsync = require('../utils/catchAsync');
const Restaurant = require('../models/restaurant.model');

//? Find All restaurants
exports.findAll = catchAsync(async (req, res, next) => {
  const restaurants = await Restaurant.findAll({
    where: {
      status: true,
    },
  });
  return res.status(200).json({
    status: 'success',
    message: 'All restaurants: ',
    results: restaurants.length,
    restaurants,
  });
});

//? Create restaurant
exports.create = catchAsync(async (req, res, next) => {
  const { name, address, rating } = req.body;

  await Restaurant.create({ name, address, rating });

  return res.status(201).json({
    status: 'success',
    message: 'restaurant created: ',
    name,
    address,
    rating,
  });
});

//? Find One restaurant
exports.findOne = catchAsync(async (req, res, next) => {
  const { restaurant } = req;
  //console.log('restaurant findOne: ',restaurant)
  return res.status(200).json({
    status: 'success',
    message: 'restaurant found',
    restaurant,
  });
}); 

//? Update restaurant
exports.update = catchAsync(async (req, res, next) => {
  const { restaurant } = req;
  const { name, address } = req.body;

  await restaurant.update({ name, address });

  return res.status(200).json({
    status: 'success',
    message: 'restaurant updated',
    restaurant,
  });
});
 
//? Delete restaurant
exports.delete = catchAsync(async (req, res, next) => {
  const { restaurant } = req;
   await restaurant.update({status:'false'});

  return res.status(200).json({
    status: 'success',
    message: 'restaurant deleted',
  });
});
