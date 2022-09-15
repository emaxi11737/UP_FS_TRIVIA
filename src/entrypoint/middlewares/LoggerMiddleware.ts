import express from "express";
import { injectable } from "inversify";
import { BaseMiddleware } from "inversify-express-utils";
import Jwt from "jsonwebtoken";

@injectable()
export default class LoggerMiddleware extends BaseMiddleware {
    private static readonly TOKEN_SECRET: string = process.env.SECRET_KEY;

    public handler(req: express.Request, res: express.Response, next: express.NextFunction) {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        if (token == null) return res.sendStatus(401);

        Jwt.verify(token, LoggerMiddleware.TOKEN_SECRET as string, (err: any, user: any) => {
            console.error(err);

            if (err) return res.sendStatus(403);

            console.log(user);
            // req.user = user

            next();
        });
    }
}
