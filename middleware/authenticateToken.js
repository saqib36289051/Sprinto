import asyncHandler from '../utils/AsyncHandler.js';
import jwt from 'jsonwebtoken';

export const validateUserToken = asyncHandler(async (req, res, next) => {
    let token;
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error('Token is not valid');
            }
            req.user = decoded
            next();
        });
    } else {
        res.status(401);
        throw new Error('No token, authorization denied');
    }
})
