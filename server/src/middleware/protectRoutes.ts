import express, { type Request, type Response } from 'express'
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'
import User from '../models/UserModel.js';
import env from '../helpers/env.js';

declare global { //para makapag pasa tayo ng user sa request;
    namespace Express {
        interface Request {
            user: any;
        }
    }
}

export const protectRoutes = async (
        req: Request, 
        res: Response, 
        next: mongoose.CallbackWithoutResultAndOptionalError
    ) : Promise<any> => {
    //fetch muna token
    const token: string = req.cookies.token;
    //get the _id from the payload and then look for the user in the database using the id.

    if (!token) return res.status(404).json({ message: 'No token found' }); 

    const {_id} = jwt.verify(token, env.JWT_SECRET) as { _id: string };
    
    try {
        const user = await User.findById(_id).select('-password');
        req.user = user;
    } catch (error) {
        res.status(404).send(error);
    }

    next();
}