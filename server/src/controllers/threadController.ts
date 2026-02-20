import type { Request, Response } from "express";
import Thread from "../models/ThreadModel.js";

export const newThread = async (req: Request, res: Response) : Promise<object> => {
    let response = {} as Object;
    try {
        const data = req.body;
        const {_id} = req.user;
        console.log(data);
        const newThread = await Thread.createThread({...data, createdBy: _id});
        response = newThread;
        res.status(201).json({status: 'success', data: newThread});
    } catch (error: any) {
        res.status(500).json({err: error.message});
    } finally {
        return response;
    }
}

export const getThreads = async (req: Request, res: Response) : Promise<Array<object> | Error> => {
    let response = {} as Array<object>;
    try {
        const data = await Thread.getThreads();
        response = data;
        res.status(200).json({success: true, data: response});
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        return response;
    }
}

