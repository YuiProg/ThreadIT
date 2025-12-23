import express, {} from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';
import env from '../helpers/env.js';
export const protectRoutes = async (req, res, next) => {
    //fetch muna token
    const token = req.cookies.token;
    //get the _id from the payload and then look for the user in the database using the id.
    if (!token)
        return res.status(404).json({ message: 'No token found' });
    const { _id } = jwt.verify(token, env.JWT_SECRET);
    try {
        const user = await User.findById(_id).select('-password');
        req.user = user;
    }
    catch (error) {
        res.status(404).send(error);
    }
    next();
};
//# sourceMappingURL=protectRoutes.js.map