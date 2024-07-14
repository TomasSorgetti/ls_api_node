import express from "express";
import morgan from "morgan";
import cors from "cors";
import { UserRouter } from "./routes/user.router";
import { AuthRouter } from "./routes/auth.router";
import { DataSource } from "typeorm";
import { ConfigServer } from "./config/config";

class ServerBootstrap extends ConfigServer {
    public app: express.Application = express();
    private port: number;
    private AppDataSource: DataSource;

    constructor() {
        super();
        this.port = this.getNumberEnv("PORT") || 8081;
        this.app.use(morgan(function (tokens, req, res) {
            return [
                '\x1b[44m', "\x1b[30m", tokens.method(req, res), '\x1b[0m',
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

        this.app.use("/api", this.routers());

        this.AppDataSource = new DataSource(this.typeORMConfig);
        this.initializeDatabase();

        this.listen();
    }

    routers(): Array<express.Router> {
        return [new UserRouter().router, new AuthRouter().router];
    }

    private async initializeDatabase() {
        try {
            await this.AppDataSource.initialize();
            console.log("Data Source has been initialized!");
            console.log("hola mundo");
            
        } catch (err) {
            console.error("Error during Data Source initialization:", err);
        }
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log("- - - - - - - - - - - - - - - - - - - - -");
            console.log("\x1b[44m", "\x1b[30m", `    Server listening on port ${this.port}      `);
            console.log("- - - - - - - - - - - - - - - - - - - - -");
        });
    }
}

new ServerBootstrap();