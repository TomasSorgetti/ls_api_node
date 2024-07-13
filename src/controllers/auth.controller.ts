import { Request, Response } from "express";

export class AuthController{
    signIn(req: Request, res: Response) {
        res.status(200).json({message: "Sign In"});
    }
    signUp(req: Request, res: Response) {
        res.status(200).json({ message: "Sign Up" });
    }
}