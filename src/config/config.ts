import * as dotenv from "dotenv";

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
        return this.getEnv("NODE_ENV")?.trim() || "prod";
    }
    
    public createPathEnv(path: string): string { 
        const arrEnv: string[] = ["env"]
        
        if (path.length > 0) {   
            const stringToArr = path.split(".");
            arrEnv.unshift(...stringToArr);
        }
        return "." + arrEnv.join(".");
    }

}