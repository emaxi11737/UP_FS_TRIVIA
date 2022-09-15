import * as express from "express";
import { inject } from "inversify";
import { controller, httpPost, interfaces, request, response, requestParam, httpPatch, httpDelete, httpGet } from "inversify-express-utils";
import { ApiPath, ApiOperationPost, SwaggerDefinitionConstant, ApiOperationPatch, ApiOperationDelete, ApiOperationGet } from 'swagger-express-ts';
import { TYPES } from "@constants/types";
import ResponseObject from '@helpers/ResponseObject';
import ICreateUserUseCase from '@application/usecases/user/create/ICreateUserUseCase';
import IUpdateUserUseCase from '@application/usecases/user/update/IUpdateUserUseCase';
import UserService from '@configuration/usecases/UserService';
import IUserDto from '@application/usecases/user/IUserDto';
import IUserPatchDto from '@application/usecases/user/IUserPatchDto';
import IDeleteUserUseCase from "@application/usecases/user/delete/IDeleteUserUseCase";
import IReadUserUseCase from "@application/usecases/user/read/IReadUserUseCase";

@ApiPath({
    path: "/users",
    name: "User"
})
@controller("/users")
export default class UserController implements interfaces.Controller {
    private readonly createUserUseCase: ICreateUserUseCase;
    private readonly updateUserUseCase: IUpdateUserUseCase;
    private readonly deleteUserUseCase: IDeleteUserUseCase;
    private readonly readUserUseCase: IReadUserUseCase;

    constructor(@inject(TYPES.UserService) userService: UserService) {
        this.createUserUseCase = userService.getCreateUserUseCase();
        this.updateUserUseCase = userService.getUpdateUserUseCase();
        this.readUserUseCase = userService.getReadUserUseCase();
    }

    @ApiOperationPost({
        description: "Post user object",
        parameters: {
            body: { description: "New user", required: true, model: "User" }
        },
        responses: {
            201: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.OBJECT, model: "User" },
            400: { description: "Error", type: SwaggerDefinitionConstant.Response.Type.ARRAY }
        },
    })
    @httpPost("/")
    public async create(@request() req: express.Request, @response() res: express.Response) {
        const userDto: IUserDto = req.body;

        return this.createUserUseCase.create(userDto)
            .then((user: IUserDto) => res.status(201).json(ResponseObject.makeSuccessResponse(user)))
            .catch((err: Error) => res.status(400).json(ResponseObject.makeErrorResponse("400", err)));
    }

    @ApiOperationPatch({
        security: { BearerToken: [] },
        description: "Patch user object",
        path: "/{id}",
        parameters: {
            path: {
                id: {
                    description: "Id of user",
                    type: SwaggerDefinitionConstant.Parameter.Type.STRING,
                    required: true
                }
            },
            body: { description: "Update user", required: true, model: "UserPatch" }
        },
        responses: {
            200: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.ARRAY, model: "User" },
            400: { description: "Error", type: SwaggerDefinitionConstant.Response.Type.ARRAY }
        },
    })
    @httpPatch("/:id", TYPES.LoggerMiddleware)
    public async update(@requestParam("id") id: string, @request() req: express.Request, @response() res: express.Response) {
        let userPatchDto: IUserPatchDto = req.body;
        userPatchDto.id = id;

        return this.updateUserUseCase.updatePartial(userPatchDto)
            .then((user: IUserDto) => res.status(200).json(ResponseObject.makeSuccessResponse(user)))
            .catch((err: Error) => res.status(400).json(ResponseObject.makeErrorResponse("400", err)));
    }

    @ApiOperationDelete({
        security: { BearerToken: [] },
        description: "Delete user object",
        path: "/{id}",
        parameters: {
            path: {
                id: {
                    description: "Id of user",
                    type: SwaggerDefinitionConstant.Parameter.Type.STRING,
                    required: true
                }
            },
        },
        responses: {
            204: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.ARRAY, model: "User" },
            400: { description: "Error", type: SwaggerDefinitionConstant.Response.Type.ARRAY }
        },
    })
    @httpDelete("/:id", TYPES.LoggerMiddleware)
    public async delete(@requestParam("id") id: string, @request() req: express.Request, @response() res: express.Response) {
        return this.deleteUserUseCase.delete(id)
            .then(() => res.status(204).json())
            .catch((err: Error) => res.status(400).json(ResponseObject.makeErrorResponse("400", err)));
    }

    @ApiOperationGet({
        security: { BearerToken: [] },
        description: "Read user object",
        path: "/{id}",
        parameters: {
            path: {
                id: {
                    description: "Id of user",
                    type: SwaggerDefinitionConstant.Parameter.Type.STRING,
                    required: true
                }
            },
        },
        responses: {
            200: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.ARRAY, model: "User" },
            400: { description: "Error", type: SwaggerDefinitionConstant.Response.Type.ARRAY }
        },
    })
    @httpGet("/:id", TYPES.LoggerMiddleware)
    public async read(@requestParam("id") id: string, @request() req: express.Request, @response() res: express.Response) {
        return this.readUserUseCase.read(id)
            .then((user: IUserDto) => res.status(200).json(ResponseObject.makeSuccessResponse(user)))
            .catch((err: Error) => res.status(400).json(ResponseObject.makeErrorResponse("400", err)));
    }
}
