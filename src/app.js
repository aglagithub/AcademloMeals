const express = require('express');
const cors = require('cors');
const morgan = require('morgan');


// Importación routes
//TODO const userRoutes = require('./routes/user.route')
// TODO const authRoutes = require('./routes/auth.route');

//Importación código Manejo de errores
// TODO const AppError = require('./utils/appError');
// TODO const globalErrorHandler = require('./controllers/error.controller');

const app = express();
//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'))


//routes
// TODO app.use('/api/v1/users', userRoutes)
// TODO app.use('/api/v1/auth', authRoutes)


//captura de rutas inexistentes
app.all('*', (req, res, next) => {
    console.log("Not Existing route")

    // TODO return next(new AppError(`!Can´t find ${req.originalUrl} on This server!`, 404));
});

//Middleware para manejo centralizado de errores
// TODO app.use(globalErrorHandler)

module.exports = app;