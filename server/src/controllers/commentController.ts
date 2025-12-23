import type { Request, Response } from "express";
import Comment from "../models/comment.model.js";
import type mongoose from "mongoose";

export const newComment = async (req : Request, res : Response) => {
    try {
        
        const { username, profilePic, _id } = req.user;
        const userId : mongoose.Schema.Types.ObjectId = _id;
        const { postId, comment } = req.body;
        const newComment = await Comment.newComment({username, profilePic, userId, postId, comment});
        res.status(201).json(newComment);
    } catch (error : any) {
        error as {message: string}
        res.status(500).json(error.message);
    }
}

export const getComments = async (req: Request, res: Response) => {
    try {

        const {id} = req.params;

        const comments = await Comment.getComments(String(id));
        res.status(200).json(comments);
    } catch (error : any) {
        error as {message: string}
        res.status(500).json(error.message);
    }
}