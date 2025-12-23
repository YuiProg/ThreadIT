import type { Request, Response } from 'express'
import User from '../models/UserModel.js';
import { generateToken } from '../middleware/generateToken.js';
import type { Types } from 'mongoose';

type UserPayload = { //for type safety when passing it to create a token.
    _id: Types.ObjectId;
    username: string;
    email: string;
    password: string;
}

type Errors = {
    email?: string;
    password?: string;
    message?: string;
    [key: string]: string;
}

const ErrorHandler = (err: any) : Errors => {
    let errors: Errors = {};
    if (err.message === 'No user found' ) {
        errors.message = err.message;
    }
    
    if (err.code === 11000) {
        errors.email = 'Email is already registered';
        return errors;
    }

    if (err._message.toLowerCase() === 'user validation failed') {
        Object.values(err.errors).forEach((err: any) => {
            const {properties} = err;
            errors[properties.path] = properties.message;
        });
    }
    return errors;
}

export const RegisterUser = async (req: Request, res: Response) => {
    const { username, email, password }  : UserPayload = req.body;
    try {
        const {_id} : UserPayload = await User.create({
            username,
            email,
            password
        }); 
        generateToken(_id, res);
        res.status(201).json({ message: "User registered successfully", user: _id });
    } catch (error) {
        const errorType = ErrorHandler(error);
        res.status(500).json(errorType);
    }
}

export const LoginUser = async (req: Request, res: Response) => {
    const { email, password } : UserPayload = req.body; //this should be a static function for clearer code. --DONE
    try {
        const { _id } = await User.login(email, password);
        generateToken(_id, res);
        res.status(200).json({ message: "User logged in successfully", user: _id });
    } catch (error) {
        const errorType = ErrorHandler(error);
        res.status(500).json(errorType);
    }
}

export const logOutUser = async (req: Request, res: Response) => {
    res.cookie('token', '', {maxAge: 0});
    res.status(200).json({message: 'User logged out'});
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { username, profilePic } = req.body;
        const {id} = req.params;
        
        //optional lang tong error handling dito pwedeng tanggalin nato.
        if (username.trim() === "" || !username && !profilePic) return res.status(500).json({message: "nothing to update"});
        
        
        const newUser = await User.updateUser(String(id), username, profilePic);

        res.status(200).json(newUser);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const GetUsers = async (req: Request, res: Response) => {
    const users = await User.getUsers();
    res.status(200).json(users);
}

export const checkUser  = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(404).json({error: "No user authenticated"});
        }
        res.status(200).json(user);
    } catch (error: any) {
        error as {message: any};
        console.log(error.message);
    }
}