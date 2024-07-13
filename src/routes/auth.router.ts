import { AuthController } from "../controllers/auth.controller";
import { BaseRouter } from "./router";


export class AuthRouter extends BaseRouter<AuthController>{
    constructor() {
        super(AuthController);
    }
    routes(): void {
        this.router.post('/login', this.controller.signIn);
        this.router.post('/register', this.controller.signUp);
    }
}