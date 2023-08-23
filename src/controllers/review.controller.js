//console.log('In File: ', __filename);
const catchAsync = require('../utils/catchAsync');
const Review = require('../models/review.model');

//? find All reviews (not implemented)
exports.findAll = catchAsync(async (req, res, next) => {
  return res.status(200).json(/* valor a retornar */);
});

//? find One review (not implemented)
exports.findOne = catchAsync(async (req, res, next) => {
  return res.status(200).json(/* valor a retornar */);
});

//? Create review
exports.create = catchAsync(async (req, res, next) => {
  //para test colocar un clg de req.body
  const { comment, rating } = req.body;
  const { id } = req.params;
  const uid = req.sessionUser.id;

  await Review.create({
    comment,
    rating,
    restaurantId: id,
    userId: uid,
  });
  return res.status(201).json({
    status: 'success',
    comment: `Review Created: ${comment}}`,
    rating,

  });
});

//? update review
exports.update = catchAsync(async (req, res, next) => {
  const { review } = req;
  const { comment, rating } = req.body;
  await review.update({ comment, rating });
  return res.status(200).json({
    status: 'success',
    comment: 'review updated',
  });
});

//? delete review
exports.delete = catchAsync(async (req, res, next) => {
  const { review } = req;
  await review.update({ status: false });
  return res.status(200).json({
    status: 'success',
    comment: 'review deleted'
  });
});
