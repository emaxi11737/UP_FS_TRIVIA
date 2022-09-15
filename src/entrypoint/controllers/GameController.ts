import * as express from "express";
import { inject } from "inversify";
import { controller, httpPost, interfaces, request, response, requestParam, httpPatch, httpGet } from "inversify-express-utils";
import { ApiPath, ApiOperationPost, SwaggerDefinitionConstant, ApiOperationPatch, ApiOperationGet } from 'swagger-express-ts';
import { TYPES } from "@constants/types";
import ResponseObject from '@helpers/ResponseObject';
import GameService from "@configuration/usecases/GameService";
import ICreateGameUseCase from "@application/usecases/game/create/ICreateGameUseCase";
import IUpdateGameUseCase from "@application/usecases/game/update/IUpdateGameUseCase";
import IReadGameUseCase from "@application/usecases/game/read/IReadGameUseCase";
import IGameDto from "@application/usecases/game/IGameDto";
import IGamePatchDto from "@application/usecases/game/IGamePatchDto";

@ApiPath({
    path: "/games",
    name: "Game",
    security: { BearerToken: [] },
})
@controller("/games", TYPES.LoggerMiddleware)
export default class GameController implements interfaces.Controller {
    private readonly createGameUseCase: ICreateGameUseCase;
    private readonly updateGameUseCase: IUpdateGameUseCase;
    private readonly readGameUseCase: IReadGameUseCase;

    constructor(@inject(TYPES.GameService) gameService: GameService) {
        this.createGameUseCase = gameService.getCreateGameUseCase();
        this.updateGameUseCase = gameService.getUpdateGameUseCase();
        this.readGameUseCase = gameService.getReadGameUseCase();
    }

    @ApiOperationPost({
        description: "Post game object",
        parameters: {
            body: { description: "New game", required: true, model: "Game" }
        },
        responses: {
            201: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.OBJECT, model: "Game" },
            400: { description: "Error", type: SwaggerDefinitionConstant.Response.Type.ARRAY },
            401: { description: "Unauthorized", type: SwaggerDefinitionConstant.Response.Type.STRING },
            403: { description: "Forbidden", type: SwaggerDefinitionConstant.Response.Type.STRING }
        },
    })
    @httpPost("/")
    public async create(@request() req: express.Request, @response() res: express.Response) {
        const gameDto: IGameDto = req.body;

        return this.createGameUseCase.create(gameDto)
            .then((game: IGameDto) => res.status(201).json(ResponseObject.makeSuccessResponse(game)))
            .catch((err: Error) => res.status(400).json(ResponseObject.makeErrorResponse("400", err)));
    }

    @ApiOperationPatch({
        description: "Patch game object",
        path: "/{id}",
        parameters: {
            path: {
                id: {
                    description: "Id of game",
                    type: SwaggerDefinitionConstant.Parameter.Type.STRING,
                    required: true
                }
            },
            body: { description: "Update game", required: true, model: "GamePatch" }
        },
        responses: {
            200: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.ARRAY, model: "Game" },
            400: { description: "Error", type: SwaggerDefinitionConstant.Response.Type.ARRAY },
            401: { description: "Unauthorized", type: SwaggerDefinitionConstant.Response.Type.STRING },
            403: { description: "Forbidden", type: SwaggerDefinitionConstant.Response.Type.STRING }
        },
    })
    @httpPatch("/:id")
    public async update(@requestParam("id") id: string, @request() req: express.Request, @response() res: express.Response) {
        let gamePatchDto: IGamePatchDto = req.body;
        gamePatchDto.id = id;

        return this.updateGameUseCase.updatePartial(gamePatchDto)
            .then((game: IGameDto) => res.status(200).json(ResponseObject.makeSuccessResponse(game)))
            .catch((err: Error) => res.status(400).json(ResponseObject.makeErrorResponse("400", err)));
    }

    @ApiOperationGet({
        description: "Read game object",
        path: "/{id}",
        parameters: {
            path: {
                id: {
                    description: "Id of game",
                    type: SwaggerDefinitionConstant.Parameter.Type.STRING,
                    required: true
                }
            },
        },
        responses: {
            200: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.ARRAY, model: "Game" },
            400: { description: "Error", type: SwaggerDefinitionConstant.Response.Type.ARRAY },
            401: { description: "Unauthorized", type: SwaggerDefinitionConstant.Response.Type.STRING },
            403: { description: "Forbidden", type: SwaggerDefinitionConstant.Response.Type.STRING }
        },
    })
    @httpGet("/:id")
    public async read(@requestParam("id") id: string, @request() req: express.Request, @response() res: express.Response) {
        return this.readGameUseCase.read(id)
            .then((game: IGameDto) => res.status(200).json(ResponseObject.makeSuccessResponse(game)))
            .catch((err: Error) => res.status(400).json(ResponseObject.makeErrorResponse("400", err)));
    }
}
