export class UserController{
    getUser(req: Request, res: Response) {
        res.status(200).json({message: 'Get User'})
    }
}