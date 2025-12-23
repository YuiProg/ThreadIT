import type { Request, Response } from "express";
import Post from "../models/PostModel.js";


export const createImagePost = async (req: Request, res: Response) : Promise<void> => {
    try {
        const data = req.body;
        const {_id, username, profilePic} = req.user;
        
        const userId = _id;
        const userImage = profilePic;
        const newPost = await Post.createImagePost({
            ...data,
            username,
            userImage,
            userId
        });
        res.status(201).json(newPost);
    } catch (error: any) {
        error as { message: any };
        res.status(500).json(error.message);
    }
}

export const createVideoPost = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const {_id, username, profilePic} = req.user;
        
        const userId = _id;
        const userImage = profilePic;
        
        const video = `data:${req.file?.mimetype};base64,${req.file?.buffer.toString("base64")}`
        const newPost = await Post.createVideoPost({userId, username, userImage, video, ...data});
        res.status(201).json(newPost);
    } catch (error : any) {
        error as { message: any };
        res.status(500).json(error.message);
    }
}

export const getPosts = async (req: Request, res: Response) => {
    try {
        const posts = await Post.getPosts();
        res.status(200).json(posts);
    } catch (error : any) {
        error as { message: any };
        res.status(500).json(error.message);
    }
}

export const getSinglePost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const post = await Post.getSinglePost(String(id));
        res.status(200).json(post);
        
    } catch (error : any) {
        error as { message: any };
        res.status(500).json(error.message);
    }
}