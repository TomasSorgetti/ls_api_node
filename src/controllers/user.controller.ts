import { Request, Response } from "express";

export class UserController{
    getUser(req: Request, res: Response) {
        res.status(200).json({message: "Hello World"});
    }
    createUser(req: Request, res: Response) {
        res.status(200).json({ message: "User created" });
    }
}