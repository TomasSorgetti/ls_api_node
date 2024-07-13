import { Request, Response } from "express";

export class UserController{
    getUser(req: Request, res: Response) {
        res.send('Hello World!');
    }
}