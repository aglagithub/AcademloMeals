console.log('In File: ', __filename);
const AppError = require('./../utils/appError');
const bcrypt = require('bcryptjs');
const catchAsync = require('../utils/catchAsync');
const generateJWT = require('../utils/jwt');

const User = require('../models/user.model');

//----------------
//sign up (Create)
//----------------
exports.create = catchAsync(async (req, res, next) => {
  //to verify
  //----------

  const { name, email, password, role } = req.body;
  console.log('In SignUp (Create user)', name, email, password, role);

  //salt numero de encriptaciones. 10 por defcto
  const salt = await bcrypt.genSalt(12);
  const encryptedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name: name.toLowerCase().trim(),
    email: email.toLowerCase().trim(),
    password: encryptedPassword,
    role:role,
  });
  //Nota: ni password ni otra información sensible deben devolverse al cliente!

  //generación del token
  const token = await generateJWT(user.id);

  res.status(200).json({
    status: 'success',
    message: 'The user has been created',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
});

//-----
//login
//-----
exports.login = catchAsync(async (req, res, next) => {
  // to verify
  //----------
  //1. Traer informacion de rer.body
  const { email, password } = req.body;

  //2. buscar el usuario y revisar si existe
  const user = await User.findOne({
    where: {
      email: email.toLowerCase().trim(),
      status: true,
    },
  });

  if (!user) {
    return next(new AppError(`User with email: ${email} not found`, 404));
  }

  //3. validar si la contraseña es correcta

  if (!(await bcrypt.compare(password, user.password))) {
    return next(new AppError(`Incorrect email or password`, 401));
  }

  //4- generar el token
  const token = await generateJWT(user.id);

  res.status(200).json({
    status: 'success',
    message: 'user logged in',  
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      token,
    },
    // en produccion NO debe enviarse el token
  });
});

//nota faltan get one y get all users


//------
//update
//------
exports.update = catchAsync(async (req, res, next) => {
    console.log('En ruta update de user')
  const { user } = req; //user se colocó en un middleware
  const { name, email } = req.body;
  await user.update({ name, email });

  return res.status(200).json({
    status: 'success',
    message: `user ${name} with email ${email} was updated`,
  });
});

//------
//delete
//------
exports.delete = catchAsync(async (req, res, next) => {
  const { user } = req; //user se coloco en un middleware

  await user.update({ status: false });

  return res.status(200).json({
    status: 'success',
    message: `user was deleted`,
  });
});
