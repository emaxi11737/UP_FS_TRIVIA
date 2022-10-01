import express from "express";
import { inject, injectable } from "inversify";
import { BaseMiddleware } from "inversify-express-utils";
import IVerifyTokenUseCase from "@application/usecases/token/verify/IVerifyTokenUseCase";
import AuthService from "@configuration/usecases/AuthService";
import { TYPES } from "@constants/types";

@injectable()
export default class LoggerMiddleware extends BaseMiddleware {

    private readonly verifyTokenUseCase: IVerifyTokenUseCase;

    constructor(@inject(TYPES.AuthService) authService: AuthService) {
        super();
        this.verifyTokenUseCase = authService.GetVerifyTokenUseCase();
    }

    public async handler(req: express.Request, res: express.Response, next: express.NextFunction) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!authHeader || !token) return res.sendStatus(401);

        const tokenIsValid = await this.verifyTokenUseCase.verify(token);
        if (!tokenIsValid) return res.sendStatus(403);

        next();
    }
}
