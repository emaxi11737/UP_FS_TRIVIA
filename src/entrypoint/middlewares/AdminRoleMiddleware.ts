import express from "express";
import { inject, injectable } from "inversify";
import { BaseMiddleware } from "inversify-express-utils";
import AuthService from "@configuration/usecases/AuthService";
import { TYPES } from "@constants/types";
import { Role } from "@constants/role";
import IDecodeTokenUseCase from "@application/usecases/token/decode/IDecodeTokenUseCase";

@injectable()
export default class AdminRoleMiddleware extends BaseMiddleware {

    private readonly decodeTokenUseCase: IDecodeTokenUseCase;

    constructor(@inject(TYPES.AuthService) authService: AuthService) {
        super();
        this.decodeTokenUseCase = authService.GetDecodeTokenUseCase();
    }

    public async handler(req: express.Request, res: express.Response, next: express.NextFunction) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!authHeader || !token) return res.sendStatus(401);

        const userEntity = await this.decodeTokenUseCase.decode(token);
        const userEntityRoles = userEntity.roles;
        if (userEntityRoles.findIndex((roleUser) => roleUser === Role.ADMIN) === -1) return res.sendStatus(401);

        next();
    }
}
