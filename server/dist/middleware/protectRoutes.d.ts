import { type Request, type Response } from 'express';
import mongoose from 'mongoose';
declare global {
    namespace Express {
        interface Request {
            user: any;
        }
    }
}
export declare const protectRoutes: (req: Request, res: Response, next: mongoose.CallbackWithoutResultAndOptionalError) => Promise<any>;
//# sourceMappingURL=protectRoutes.d.ts.map