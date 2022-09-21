import * as express from "express";
import { inject } from "inversify";
import { controller, httpPost, interfaces, request, response, requestParam, httpPatch, httpGet, httpDelete } from "inversify-express-utils";
import { ApiPath, ApiOperationPost, SwaggerDefinitionConstant, ApiOperationPatch, ApiOperationGet, ApiOperationDelete } from 'swagger-express-ts';
import { TYPES } from "@constants/types";
import ResponseObject from '@helpers/ResponseObject';
import AnswerService from "@configuration/usecases/AnswerService";
import ICreateAnswerUseCase from "@application/usecases/answer/create/ICreateAnswerUseCase";
import IUpdateAnswerUseCase from "@application/usecases/answer/update/IUpdateAnswerUseCase";
import IReadAnswerUseCase from "@application/usecases/answer/read/IReadAnswerUseCase";
import IListAnswerUseCase from "@application/usecases/answer/list/IListAnswerUseCase";
import IDeleteAnswerUseCase from "@application/usecases/answer/delete/IDeleteAnswerUseCase";
import IAnswerDto from "@application/usecases/answer/IAnswerDto";
import IAnswerPatchDto from "@application/usecases/answer/IAnswerPatchDto";
import IPaginationFilterDto from "@application/usecases/pagination/IPaginationFilterDto";

@ApiPath({
    path: "/answers",
    name: "Answer",
    security: { BearerToken: [] },
})
@controller("/answers", TYPES.LoggerMiddleware)
export default class AnswerController implements interfaces.Controller {
    private readonly createAnswerUseCase: ICreateAnswerUseCase;
    private readonly updateAnswerUseCase: IUpdateAnswerUseCase;
    private readonly readAnswerUseCase: IReadAnswerUseCase;
    private readonly listAnswerUseCase: IListAnswerUseCase;
    private readonly deleteAnswerUseCase: IDeleteAnswerUseCase;

    constructor(@inject(TYPES.AnswerService) answerService: AnswerService) {
        this.createAnswerUseCase = answerService.getCreateAnswerUseCase();
        this.updateAnswerUseCase = answerService.getUpdateAnswerUseCase();
        this.readAnswerUseCase = answerService.getReadAnswerUseCase();
        this.listAnswerUseCase = answerService.getListAnswerUseCase();
        this.deleteAnswerUseCase = answerService.getDeleteAnswerUseCase();
    }

    @ApiOperationPost({
        description: "Post answer object",
        parameters: {
            body: { description: "New answer", required: true, model: "answer" }
        },
        responses: {
            201: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.OBJECT, model: "Answer" },
            400: { description: "Error", type: SwaggerDefinitionConstant.Response.Type.ARRAY },
            401: { description: "Unauthorized", type: SwaggerDefinitionConstant.Response.Type.STRING },
            403: { description: "Forbidden", type: SwaggerDefinitionConstant.Response.Type.STRING }
        },
    })
    @httpPost("/", TYPES.AdminRoleMiddleware)
    public async create(@request() req: express.Request, @response() res: express.Response) {
        const answerDto: IAnswerDto = req.body;

        return this.createAnswerUseCase.create(answerDto)
            .then((answer: IAnswerDto) => res.status(201).json(ResponseObject.makeSuccessResponse(answer)))
            .catch((err: Error) => res.status(400).json(ResponseObject.makeErrorResponse("400", err)));
    }

    @ApiOperationPatch({
        description: "Patch answer object",
        path: "/{id}",
        parameters: {
            path: {
                id: {
                    description: "Id of answer",
                    type: SwaggerDefinitionConstant.Parameter.Type.STRING,
                    required: true
                }
            },
            body: { description: "Update answer", required: true, model: "AnswerPatch" }
        },
        responses: {
            200: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.ARRAY, model: "Answer" },
            400: { description: "Error", type: SwaggerDefinitionConstant.Response.Type.ARRAY },
            401: { description: "Unauthorized", type: SwaggerDefinitionConstant.Response.Type.STRING },
            403: { description: "Forbidden", type: SwaggerDefinitionConstant.Response.Type.STRING },

        },
    })
    @httpPatch("/:id", TYPES.AdminRoleMiddleware)
    public async update(@requestParam("id") id: string, @request() req: express.Request, @response() res: express.Response) {
        let answerPatchDto: IAnswerPatchDto = req.body;
        answerPatchDto.id = id;

        return this.updateAnswerUseCase.updatePartial(answerPatchDto)
            .then((answer: IAnswerDto) => res.status(200).json(ResponseObject.makeSuccessResponse(answer)))
            .catch((err: Error) => res.status(400).json(ResponseObject.makeErrorResponse("400", err)));
    }

    @ApiOperationGet({
        description: "List answers",
        responses: {
            200: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.ARRAY, model: "Answer" },
            400: { description: "Error", type: SwaggerDefinitionConstant.Response.Type.ARRAY },
            401: { description: "Unauthorized", type: SwaggerDefinitionConstant.Response.Type.STRING },
            403: { description: "Forbidden", type: SwaggerDefinitionConstant.Response.Type.STRING }
        },
    })
    @httpGet("/")
    public async list(@request() req: express.Request, @response() res: express.Response) {
        const paginationDto: IPaginationFilterDto = {
            limit: Number(req.query.limit),
            page: Number(req.query.page)
        }
        // TODO add filters

        return this.listAnswerUseCase.list(paginationDto)
            .then((answers: IAnswerDto[]) => res.status(200).json(ResponseObject.makeSuccessResponse(answers)))
            .catch((err: Error) => res.status(400).json(ResponseObject.makeErrorResponse("400", err)));
    }

    @ApiOperationGet({
        description: "Read answer object",
        path: "/{id}",
        parameters: {
            path: {
                id: {
                    description: "Id of answer",
                    type: SwaggerDefinitionConstant.Parameter.Type.STRING,
                    required: true
                }
            },
        },
        responses: {
            200: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.ARRAY, model: "Answer" },
            400: { description: "Error", type: SwaggerDefinitionConstant.Response.Type.ARRAY },
            401: { description: "Unauthorized", type: SwaggerDefinitionConstant.Response.Type.STRING },
            403: { description: "Forbidden", type: SwaggerDefinitionConstant.Response.Type.STRING }
        },
    })
    @httpGet("/:id")
    public async read(@requestParam("id") id: string, @request() req: express.Request, @response() res: express.Response) {
        return this.readAnswerUseCase.read(id)
            .then((answer: IAnswerDto) => res.status(200).json(ResponseObject.makeSuccessResponse(answer)))
            .catch((err: Error) => res.status(400).json(ResponseObject.makeErrorResponse("400", err)));
    }

    @ApiOperationDelete({
        security: { BearerToken: [] },
        description: "Delete answer object",
        path: "/{id}",
        parameters: {
            path: {
                id: {
                    description: "Id of answer",
                    type: SwaggerDefinitionConstant.Parameter.Type.STRING,
                    required: true
                }
            },
        },
        responses: {
            204: { description: "Success" },
            400: { description: "Error", type: SwaggerDefinitionConstant.Response.Type.ARRAY },
            401: { description: "Unauthorized", type: SwaggerDefinitionConstant.Response.Type.STRING },
            403: { description: "Forbidden", type: SwaggerDefinitionConstant.Response.Type.STRING }
        },
    })
    @httpDelete("/:id", TYPES.AdminRoleMiddleware)
    public async delete(@requestParam("id") id: string, @request() req: express.Request, @response() res: express.Response) {
        return this.deleteAnswerUseCase.delete(id)
            .then(() => res.status(204).json())
            .catch((err: Error) => res.status(400).json(ResponseObject.makeErrorResponse("400", err)));
    }
}
