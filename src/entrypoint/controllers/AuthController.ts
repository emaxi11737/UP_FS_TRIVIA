import * as express from "express";
import { inject } from "inversify";
import { controller, httpPost, interfaces, request, response } from "inversify-express-utils";
import { ApiPath, ApiOperationPost, SwaggerDefinitionConstant } from 'swagger-express-ts';
import { TYPES } from "@constants/types";
import ResponseObject from '@helpers/ResponseObject';
import AuthService from '@configuration/usecases/AuthService';
import ISignInUseCase from '@application/usecases/user/signin/ISignInUseCase';
import IUserDto from '@application/usecases/user/IUserDto';
import ITokenDto from "@application/usecases/token/ITokenDto";

@ApiPath({
    path: "/auth",
    name: "Auth",
})
@controller("/auth")
export default class AuthController implements interfaces.Controller {

    private readonly signInUseCase: ISignInUseCase;

    constructor(@inject(TYPES.AuthService) authService: AuthService) {
        this.signInUseCase = authService.GetSignInUseCase();
    }

    @ApiOperationPost({
        description: "Sign in user",
        path: "/signin",
        parameters: {
            body: { description: "Sign in", required: true, model: "User" }
        },
        responses: {
            200: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.OBJECT, model: "User" },
            400: { description: "Error", type: SwaggerDefinitionConstant.Response.Type.ARRAY }
        },
    })
    @httpPost("/signin")
    public async signin(@request() req: express.Request, @response() res: express.Response) {
        const userDto: IUserDto = req.body;

        return this.signInUseCase.signin(userDto)
            .then((token: ITokenDto) => res.status(200).json(ResponseObject.makeSuccessResponse(token)))
            .catch((err: Error) => res.status(400).json(ResponseObject.makeErrorResponse("400", err)));
    }
}
