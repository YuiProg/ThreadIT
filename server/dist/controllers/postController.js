import Post from "../models/PostModel.js";
export const createImagePost = async (req, res) => {
    try {
        const data = req.body;
        const { _id, username, profilePic } = req.user;
        const userId = _id;
        const userImage = profilePic;
        const newPost = await Post.createImagePost({
            ...data,
            username,
            userImage,
            userId
        });
        res.status(201).json(newPost);
    }
    catch (error) {
        error;
        res.status(500).json(error.message);
    }
};
export const createVideoPost = async (req, res) => {
    try {
        const data = req.body;
        const { _id, username, profilePic } = req.user;
        const userId = _id;
        const userImage = profilePic;
        const video = `data:${req.file?.mimetype};base64,${req.file?.buffer.toString("base64")}`;
        const newPost = await Post.createVideoPost({ userId, username, userImage, video, ...data });
        res.status(201).json(newPost);
    }
    catch (error) {
        error;
        res.status(500).json(error.message);
    }
};
export const getPosts = async (req, res) => {
    try {
        const posts = await Post.getPosts();
        res.status(200).json(posts);
    }
    catch (error) {
        error;
        res.status(500).json(error.message);
    }
};
export const getSinglePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.getSinglePost(String(id));
        res.status(200).json(post);
    }
    catch (error) {
        error;
        res.status(500).json(error.message);
    }
};
export const likePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const { _id, username, profilePic } = req.user;
        const updatedPost = await Post.likePost(String(postId), {
            userId: String(_id),
            username,
            userImage: profilePic
        });
        res.status(200).json(updatedPost);
    }
    catch (error) {
        error;
        res.status(500).json(error.message);
    }
};
export const unlikePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const { _id, username, profilePic } = req.user;
        const updatedPost = await Post.unlikePost(String(postId), {
            userId: String(_id),
            username,
            userImage: profilePic
        });
        res.status(200).json(updatedPost);
    }
    catch (error) {
        error;
        res.status(500).json(error.message);
    }
};
export const downvotePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const { _id, username, profilePic } = req.user;
        const updatedPost = await Post.downvotePost(String(postId), {
            userId: String(_id),
            username,
            userImage: profilePic
        });
        res.status(200).json(updatedPost);
    }
    catch (error) {
        error;
        res.status(500).json(error.message);
    }
};
export const undownvotePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const { _id, username, profilePic } = req.user;
        const updatedPost = await Post.undownvotePost(String(postId), {
            userId: String(_id),
            username,
            userImage: profilePic
        });
        res.status(200).json(updatedPost);
    }
    catch (error) {
        error;
        res.status(500).json(error.message);
    }
};
//# sourceMappingURL=postController.js.map