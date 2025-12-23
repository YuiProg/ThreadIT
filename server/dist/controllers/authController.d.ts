import type { Request, Response } from 'express';
export declare const RegisterUser: (req: Request, res: Response) => Promise<void>;
export declare const LoginUser: (req: Request, res: Response) => Promise<void>;
export declare const logOutUser: (req: Request, res: Response) => Promise<void>;
export declare const updateUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const GetUsers: (req: Request, res: Response) => Promise<void>;
export declare const checkUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=authController.d.ts.map