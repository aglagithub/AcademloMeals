const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const User = require('../models/user.model');

//Busca el usuario, si lo enconyró, lo adjunta a la req
exports.existUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  //console.log(`exist user id ${id} ?`)
  const user = await User.findOne({
    where: {
      status: true,
      id,
    },
  });

  if (!user) return next(new AppError(`User with id: ${id} not found`, 404));

  req.user = user; //Busca el usuario, si lo encontró lo adjunta a la req
  next();
});
