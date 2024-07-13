import express from "express";
import morgan from "morgan";
import cors from "cors";
import { UserRouter } from "./routes/user.router";
import { ConfigServer } from "./config/config";
import { AuthRouter } from "./routes/auth.router";

class ServerBootstrap extends ConfigServer{
    public app: express.Application = express();
    private port: number = this.getNumberEnv('PORT') || 8081;

    constructor() {
        super();
        this.app.use(morgan(function (tokens, req, res) {
            return [
                '\x1b[44m',"\x1b[30m", tokens.method(req, res), '\x1b[0m',
                '\x1b[32m', tokens.url(req, res), '\x1b[0m',
                '\x1b[33m', tokens.status(req, res), '\x1b[0m',
                '-',
                tokens['response-time'](req, res), 'ms'
            ].join(' ');
        }));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors());
        this.app.use(express.static('public')); 

        this.app.use("/api",this.routers())
        this.listen()
    }
    routers(): Array<express.Router>{
        return [new UserRouter().router, new AuthRouter().router]
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log("- - - - - - - - - - - - - - - - - - - - -");
            console.log("\x1b[44m","\x1b[30m",`    Server listening on port ${this.port}      `);
            console.log("- - - - - - - - - - - - - - - - - - - - -");
        })
    }
}

new ServerBootstrap()