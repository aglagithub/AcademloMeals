//console.log('In File: ', __filename);
const catchAsync = require('../utils/catchAsync');
const Order = require('../models/order.model');

//? Create order
exports.create = catchAsync(async (req, res, next) => {
  console.log('In: order controller: create');
  const { userId, mealId, quantity } = req.body;

  const price = 30; //debo Obtenerlo
  const totalprice = quantity * price;

  await Order.create({
    mealId,
    userId,
    totalPrice: quantity * price,
    quantity,
  });

  return res.status(201).json({
    status: 'success',
    message: 'Order Created',
    userId,
    mealId,
    quantity,
    totalPrice: quantity * price,
  });
});

//? find all orders
exports.findAll = catchAsync(async (req, res, next) => {
  console.log('In: order controller: findAll');
  const { me } = req.params;
  const orders = await Order.findAll({
    where: {
      status: 'active',
      userId: me,
    },
  });

  return res.status(200).json({
    status: 'Success',
    message: 'All orders: ',
    results: orders.length,
    orders,
  });
});

//? find one order
exports.findOne = catchAsync(async (req, res, next) => {
  console.log('In: order controller: findone');
  return res.status(200).json({ status: 'Not implemented' });
});

//? update order
exports.update = catchAsync(async (req, res, next) => {
  console.log('In: order controller: update');
  const { id } = req.params;
  const order = await Order.findOne({
    where: {
      status: 'active',
      id,
    },
  });

  await order.update({ status: 'completed' });
  return res
    .status(200)
    .json({ status: 'Success', message: `order:${id} marked as completed ` });
});

//? delete order
exports.delete = catchAsync(async (req, res, next) => {
  console.log('In: order controller: delete');
  const { id } = req.params;
  const order = await Order.findOne({
    where: {
      status: 'active',
      id,
    },
  });

  await order.update({ status: 'cancelled' });
  return res
    .status(200)
    .json({ status: 'Success', message: `order:${id} marked as cancelled ` });
});
