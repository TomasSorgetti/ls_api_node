import * as dotenv from "dotenv";
import { DataSourceOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

export abstract class ConfigServer{
    constructor() {
    const nodeNameEnv = this.createPathEnv(this.nodeEnv)
    dotenv.config({
            path: nodeNameEnv
        })
    }
    public getEnv(key: string):string | undefined {
        return process.env[key];
    }
    public getNumberEnv(key: string) : number {
        return Number(this.getEnv(key));
    }
    
    public get nodeEnv(): string {
        return this.getEnv("NODE_ENV")?.trim() || "";
    }
    
    public createPathEnv(path: string): string { 
    const arrEnv: string[] = ["env"]
    
    if (path.length > 0) {   
        const stringToArr = path.split(".");
        arrEnv.unshift(...stringToArr);
    }
    return "." + arrEnv.join(".");
    }

    public get typeORMConfig(): DataSourceOptions {
        return {
            type: "mysql",
            host: this.getEnv("DB_HOST"),
            port: this.getNumberEnv("DB_PORT"),
            username: this.getEnv("DB_USERNAME"),
            password: this.getEnv("DB_PASSWORD"),
            database: this.getEnv("DB_DATABASE"),
            entities: [__dirname + "/../**/*.entity{.ts,.js}"],
            migrations: [__dirname + "/../../migrations/*{.ts,.js}"],
            synchronize: true,
            logging: false,
            namingStrategy: new SnakeNamingStrategy()
        }
    }

}