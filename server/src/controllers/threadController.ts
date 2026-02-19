import type { Request, Response } from "express";
import Thread from "../models/ThreadModel.js";

export const newThread = async (req: Request, res: Response) : Promise<Object> => {
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

