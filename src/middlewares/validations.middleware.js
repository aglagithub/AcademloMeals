const { body, validationResult } = require('express-validator')

const validFields = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 'error',
            errors: errors.mapped(),
        })
    }
    next();
}

//---------------------------------------------------------------------------------

//----
//user:
//----
//validación de creación de usuario
exports.createUserValidation = [
    body('name')
        .notEmpty().withMessage('Name is required'),
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Email must be a correct format'),
    body('password')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
        .matches(/[a-zA-Z]/).withMessage('Password must have at least one letter'),
    body('role')
        .isIn('normal', 'admin').withMessage('role only : "normal" or "admin"'),
    validFields,
]

//validación de patch de usuario
exports.updateUserValidation = [
    body('name').notEmpty().withMessage('Name is Required'),
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Email must be a correct format'),
    validFields,
]


//validación de login de usuario
exports.loginUserValidaton = [
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Email must be a correct format'),
    body('password')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
        .matches(/[a-zA-Z]/).withMessage('Password must have at least one letter'),
    validFields,

]

//validación de update de password de usuario (lo piden??)
/* exports.updatePasswordValidation = [
    body('currentPassword')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
        .matches(/[a-zA-Z]/).withMessage('Password must have at least one letter'),
    body('newPassword')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
        .matches(/[a-zA-Z]/).withMessage('Password must have at least one letter'),
    validFields,
]

 */
//-----------
//restaurant:
//-----------

//validación de creación de restaurant
exports.createRestaurantValidation = [
    body('name').notEmpty().withMessage('Name is required'),
    body('address').notEmpty().withMessage('Address is required'),
    body('rating').notEmpty().withMessage('Rating is required'),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),

    validFields,
];

//validación de update de restaurant
exports.updateRestaurantValidation = [
    body('name').notEmpty().withMessage('Name is required'),
    body('address').notEmpty().withMessage('Address is required'),

    validFields,
];

//------
//review:
//------
//validación de creación de review
exports.createReviewValidation = [
    body('comment').notEmpty().withMessage('Comment is required'),
    body('rating').notEmpty().withMessage('Rating is required'),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),

    validFields,
];

//validación de update de review
exports.updateReviewValidation = [
    body('comment').notEmpty().withMessage('Comment is required'),
    body('rating').notEmpty().withMessage('Rating is required'),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),

    validFields,
];

//----
//meal:
//----
//validación de creación de meal
exports.createMealValidation = [
    body('name').notEmpty().withMessage('Name is required'),
    body('price').notEmpty().withMessage('Price is required'),

    validFields,
];

//validación de update de meal
exports.updateMealValidation = [
    body('name').notEmpty().withMessage('Name is required'),
    body('price').notEmpty().withMessage('Price is required'),

    validFields,
];

//-----
//order:
//-----
//validación de creación de order
exports.createOrderValidation = [
    body('quantity').notEmpty().withMessage('Quantity is required'),
    body('mealId').notEmpty().withMessage('Meal Id is required'),

    validFields,
];

//validación de update de order (lo piden??)
/* exports.updateOrderValidation = [
    body('text').notEmpty().withMessage('Text is required'),
    body('mealId').notEmpty().withMessage('PostId is required'),
    
    validFields,
]; */

