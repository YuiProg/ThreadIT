import type { Request, Response } from "express";
import Thread from "../models/ThreadModel.js";

const ErrorHandler = (err: any) => {
    const errors = {};
    console.log(err);
    if (err.code === 11000) {
        return {success: false, err: 'Thread name already exists!'};
    }
}

export const newThread = async (req: Request, res: Response) : Promise<object> => {
    let response = {} as Object;
    try {
        const data = req.body;
        const {_id, profilePic} = req.user;
        console.log(req.user);
        const newThread = await Thread.createThread({...data, createdBy: _id, userIconUrl: profilePic});
        response = newThread;
        res.status(201).json({status: 'success', data: newThread});
    } catch (error: any) {
        const err = ErrorHandler(error);
        res.status(500).json(err);
    } finally {
        return response;
    }
}

export const getThreads = async (req: Request, res: Response) : Promise<Array<object> | Error> => {
    let response = {} as Array<object>;
    try {
        const data = await Thread.getThreads();
        response = data;
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        return response;
    }
}

