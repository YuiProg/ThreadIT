import User from '../models/UserModel.js';
import { generateToken } from '../middleware/generateToken.js';
const ErrorHandler = (err) => {
    let errors = {};
    if (err.message === 'No user found') {
        errors.message = err.message;
    }
    if (err.code === 11000) {
        errors.email = 'Email is already registered';
        return errors;
    }
    if (err._message.toLowerCase() === 'user validation failed') {
        Object.values(err.errors).forEach((err) => {
            const { properties } = err;
            errors[properties.path] = properties.message;
        });
    }
    return errors;
};
export const RegisterUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const { _id } = await User.create({
            username,
            email,
            password
        });
        generateToken(_id, res);
        res.status(201).json({ message: "User registered successfully", user: _id });
    }
    catch (error) {
        const errorType = ErrorHandler(error);
        res.status(500).json(errorType);
    }
};
export const LoginUser = async (req, res) => {
    const { email, password } = req.body; //this should be a static function for clearer code. --DONE
    try {
        const { _id } = await User.login(email, password);
        generateToken(_id, res);
        res.status(200).json({ message: "User logged in successfully", user: _id });
    }
    catch (error) {
        const errorType = ErrorHandler(error);
        res.status(500).json(errorType);
    }
};
export const logOutUser = async (req, res) => {
    res.cookie('token', '', { maxAge: 0 });
    res.status(200).json({ message: 'User logged out' });
};
export const updateUser = async (req, res) => {
    try {
        const { username, profilePic } = req.body;
        const { id } = req.params;
        //optional lang tong error handling dito pwedeng tanggalin nato.
        if (username.trim() === "" || !username && !profilePic)
            return res.status(500).json({ message: "nothing to update" });
        const newUser = await User.updateUser(String(id), username, profilePic);
        res.status(200).json(newUser);
    }
    catch (error) {
        res.status(500).json(error);
    }
};
export const GetUsers = async (req, res) => {
    const users = await User.getUsers();
    res.status(200).json(users);
};
export const checkUser = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(404).json({ error: "No user authenticated" });
        }
        res.status(200).json(user);
    }
    catch (error) {
        error;
        console.log(error.message);
    }
};
//# sourceMappingURL=authController.js.map