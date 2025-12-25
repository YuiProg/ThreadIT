import type { Request, Response } from "express";
export declare const createImagePost: (req: Request, res: Response) => Promise<void>;
export declare const createVideoPost: (req: Request, res: Response) => Promise<void>;
export declare const getPosts: (req: Request, res: Response) => Promise<void>;
export declare const getSinglePost: (req: Request, res: Response) => Promise<void>;
export declare const likePost: (req: Request, res: Response) => Promise<void>;
export declare const unlikePost: (req: Request, res: Response) => Promise<void>;
export declare const downvotePost: (req: Request, res: Response) => Promise<void>;
export declare const undownvotePost: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=postController.d.ts.map