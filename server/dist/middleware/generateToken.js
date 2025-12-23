import jwt from 'jsonwebtoken';
import express from 'express';
import { Types } from 'mongoose';
import env from '../helpers/env.js';
const expires = 3 * 24 * 60 * 60;
export const generateToken = (_id, res) => {
    const token = jwt.sign({ _id }, env.JWT_SECRET, {
        expiresIn: expires
    });
    res.cookie('token', token, {
        httpOnly: true,
        maxAge: expires * 1000
    });
    return token;
};
//# sourceMappingURL=generateToken.js.map