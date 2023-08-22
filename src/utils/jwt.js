const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateJWT = (id) => {
    return new Promise((resolve, reject) => {
        const payload = { id };
        //console.log('process.env.SECRET_JWT_SEED',process.env.SECRET_JWT_SEED);
        jwt.sign(
            payload,
            process.env.SECRET_JWT_SEED,
            {
                expiresIn: process.env.JWT_EXPIRE_IN
            },
            (err, token) => {
                if (err) {
                    reject(err);
                }
                resolve(token)
            }
        );
    });
};

module.exports = generateJWT;