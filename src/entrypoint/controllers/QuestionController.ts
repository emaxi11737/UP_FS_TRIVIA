import * as express from "express";
import { inject } from "inversify";
import { controller, httpPost, interfaces, request, response, requestParam, httpPatch, httpGet, httpDelete } from "inversify-express-utils";
import { ApiPath, ApiOperationPost, SwaggerDefinitionConstant, ApiOperationPatch, ApiOperationDelete, ApiOperationGet } from 'swagger-express-ts';
import { TYPES } from "@constants/types";
import ResponseObject from '@helpers/ResponseObject';
import QuestionService from '@configuration/usecases/QuestionService';
import ICreateQuestionUseCase from '@application/usecases/question/create/ICreateQuestionUseCase';
import IUpdateQuestionUseCase from '@application/usecases/question/update/IUpdateQuestionUseCase';
import IListQuestionUseCase from "@application/usecases/question/list/IListQuestionUseCase";
import IDeleteQuestionUseCase from "@application/usecases/question/delete/IDeleteQuestionUseCase";
import IQuestionDto from '@application/usecases/question/IQuestionDto';
import IQuestionPatchDto from '@application/usecases/question/IQuestionPatchDto';
import IPaginationFilterDto from "@application/usecases/pagination/IPaginationFilterDto";

@ApiPath({
    path: "/questions",
    name: "Question",
    security: { BearerToken: [] },
})
@controller("/question", TYPES.LoggerMiddleware)
export default class QuestionController implements interfaces.Controller {
    private readonly createQuestionUseCase: ICreateQuestionUseCase;
    private readonly updateQuestionUseCase: IUpdateQuestionUseCase;
    private readonly listQuestionUseCase: IListQuestionUseCase;
    private readonly deleteQuestionUseCase: IDeleteQuestionUseCase;

    constructor(@inject(TYPES.QuestionService) questionService: QuestionService) {
        this.createQuestionUseCase = questionService.getCreateQuestionUseCase();
        this.updateQuestionUseCase = questionService.getUpdateQuestionUseCase();
        this.listQuestionUseCase = questionService.getListQuestionUseCase();
        this.deleteQuestionUseCase = questionService.getDeleteQuestionUseCase();
    }

    @ApiOperationPost({
        description: "Post question  object",
        parameters: {
            body: { description: "New question ", required: true, model: "Question" }
        },
        responses: {
            201: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.OBJECT, model: "Question" },
            400: { description: "Error", type: SwaggerDefinitionConstant.Response.Type.ARRAY },
            401: { description: "Unauthorized", type: SwaggerDefinitionConstant.Response.Type.STRING },
            403: { description: "Forbidden", type: SwaggerDefinitionConstant.Response.Type.STRING }
        },
    })
    @httpPost("/")
    public async create(@request() req: express.Request, @response() res: express.Response) {
        const questionDto: IQuestionDto = req.body;

        return this.createQuestionUseCase.create(questionDto)
            .then((question: IQuestionDto) => res.status(201).json(ResponseObject.makeSuccessResponse(question)))
            .catch((err: Error) => res.status(400).json(ResponseObject.makeErrorResponse("400", err)));
    }

    @ApiOperationPatch({
        description: "Patch question  object",
        path: "/{id}",
        parameters: {
            path: {
                id: {
                    description: "Id of question ",
                    type: SwaggerDefinitionConstant.Parameter.Type.STRING,
                    required: true
                }
            },
            body: { description: "Update question ", required: true, model: "QuestionPatch" }
        },
        responses: {
            200: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.ARRAY, model: "Question" },
            400: { description: "Error", type: SwaggerDefinitionConstant.Response.Type.ARRAY },
            401: { description: "Unauthorized", type: SwaggerDefinitionConstant.Response.Type.STRING },
            403: { description: "Forbidden", type: SwaggerDefinitionConstant.Response.Type.STRING }
        },
    })
    @httpPatch("/:id")
    public async update(@requestParam("id") id: string, @request() req: express.Request, @response() res: express.Response) {
        let questionPatchDto: IQuestionPatchDto = req.body;
        questionPatchDto.id = id;

        return this.updateQuestionUseCase.updatePartial(questionPatchDto)
            .then((question: IQuestionDto) => res.status(200).json(ResponseObject.makeSuccessResponse(question)))
            .catch((err: Error) => res.status(400).json(ResponseObject.makeErrorResponse("400", err)));
    }

    @ApiOperationGet({
        description: "List question categories",
        responses: {
            200: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.ARRAY, model: "Question" },
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

        return this.listQuestionUseCase.list(paginationDto)
            .then((questioncategories: IQuestionDto[]) => res.status(200).json(ResponseObject.makeSuccessResponse(questioncategories)))
            .catch((err: Error) => res.status(400).json(ResponseObject.makeErrorResponse("400", err)));
    }

    @ApiOperationDelete({
        description: "Delete question  object",
        path: "/{id}",
        parameters: {
            path: {
                id: {
                    description: "Id of question ",
                    type: SwaggerDefinitionConstant.Parameter.Type.STRING,
                    required: true
                }
            },
        },
        responses: {
            200: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.ARRAY, model: "Question" },
            400: { description: "Error", type: SwaggerDefinitionConstant.Response.Type.ARRAY },
            401: { description: "Unauthorized", type: SwaggerDefinitionConstant.Response.Type.STRING },
            403: { description: "Forbidden", type: SwaggerDefinitionConstant.Response.Type.STRING }
        },
    })
    @httpDelete("/:id")
    public async delete(@requestParam("id") id: string, @request() req: express.Request, @response() res: express.Response) {
        return this.deleteQuestionUseCase.delete(id)
            .then(() => res.status(204).json())
            .catch((err: Error) => res.status(400).json(ResponseObject.makeErrorResponse("400", err)));
    }
}
