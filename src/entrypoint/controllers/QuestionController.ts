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
import IRandomQuestionUseCase from "@application/usecases/question/random/IRandomQuestionUseCase";
import IQuestionDto from '@application/usecases/question/IQuestionDto';
import IQuestionPatchDto from '@application/usecases/question/IQuestionPatchDto';
import IPaginationFilterDto from "@application/usecases/pagination/IPaginationFilterDto";
import IQuestionFilterDto from "@application/usecases/question/IQuestionFilterDto";
import IRandomQuestionFilterDto from "@application/usecases/question/IRandomQuestionFilterDto";
@ApiPath({
    path: "/questions",
    name: "Question",
    security: { BearerToken: [] },
})
@controller("/questions", TYPES.LoggerMiddleware)
export default class QuestionController implements interfaces.Controller {
    private readonly createQuestionUseCase: ICreateQuestionUseCase;
    private readonly updateQuestionUseCase: IUpdateQuestionUseCase;
    private readonly listQuestionUseCase: IListQuestionUseCase;
    private readonly deleteQuestionUseCase: IDeleteQuestionUseCase;
    private readonly randomQuestionUseCase: IRandomQuestionUseCase;

    constructor(@inject(TYPES.QuestionService) questionService: QuestionService) {
        this.createQuestionUseCase = questionService.getCreateQuestionUseCase();
        this.updateQuestionUseCase = questionService.getUpdateQuestionUseCase();
        this.listQuestionUseCase = questionService.getListQuestionUseCase();
        this.deleteQuestionUseCase = questionService.getDeleteQuestionUseCase();
        this.randomQuestionUseCase = questionService.getRandomQuestionUseCase();
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
    @httpPost("/", TYPES.AdminRoleMiddleware)
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
    @httpPatch("/:id", TYPES.AdminRoleMiddleware)
    public async update(@requestParam("id") id: string, @request() req: express.Request, @response() res: express.Response) {
        let questionPatchDto: IQuestionPatchDto = req.body;
        questionPatchDto.id = id;

        return this.updateQuestionUseCase.updatePartial(questionPatchDto)
            .then((question: IQuestionDto) => res.status(200).json(ResponseObject.makeSuccessResponse(question)))
            .catch((err: Error) => res.status(400).json(ResponseObject.makeErrorResponse("400", err)));
    }

    @ApiOperationGet({
        description: "List question categories",
        parameters: {
            query: {
                page: {
                    description: "Page of questions",
                    type: SwaggerDefinitionConstant.Parameter.Type.NUMBER,
                    required: false
                },
                limit: {
                    description: "Limit of questions",
                    type: SwaggerDefinitionConstant.Parameter.Type.NUMBER,
                    required: false
                },
                questionCategoryId: {
                    description: "Question category id of questions",
                    type: SwaggerDefinitionConstant.Parameter.Type.STRING,
                    required: false
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
    @httpGet("/")
    public async list(@request() req: express.Request, @response() res: express.Response) {
        const paginationDto: IPaginationFilterDto = {
            limit: Number(req.query.limit),
            page: Number(req.query.page)
        }
        const questionFilters: IQuestionFilterDto = {
            questionCategoryId: req.query.questionCategoryId ? String(req.query.questionCategoryId) : undefined
        };


        return this.listQuestionUseCase.list(paginationDto,questionFilters)
            .then((questioncategories: IQuestionDto[]) => res.status(200).json(ResponseObject.makeSuccessResponse(questioncategories)))
            .catch((err: Error) => res.status(400).json(ResponseObject.makeErrorResponse("400", err)));
    }

    @ApiOperationGet({
        path: "/random",
        description: "Random question categories",
        parameters: {
            query: {
                questionCategoriesId: {
                    description: "Question categories id of questions",
                    type: SwaggerDefinitionConstant.Parameter.Type.ARRAY,
                    required: true,
                    
                },
                level: {
                    description: "Questions Level",
                    type: SwaggerDefinitionConstant.Parameter.Type.NUMBER,
                    required: true,
                    
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
    @httpGet("/random")
    public async random(@request() req: express.Request, @response() res: express.Response) {
        const questionFilters: IRandomQuestionFilterDto = {
            questionCategoriesId: req.query.questionCategoriesId.toString().split(','),
            level: req.query.level ? Number(req.query.level) : undefined,
            size: 10
        };


        return this.randomQuestionUseCase.random(questionFilters)
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
            204: { description: "Success" },
            400: { description: "Error", type: SwaggerDefinitionConstant.Response.Type.ARRAY },
            401: { description: "Unauthorized", type: SwaggerDefinitionConstant.Response.Type.STRING },
            403: { description: "Forbidden", type: SwaggerDefinitionConstant.Response.Type.STRING }
        },
    })
    @httpDelete("/:id", TYPES.AdminRoleMiddleware)
    public async delete(@requestParam("id") id: string, @request() req: express.Request, @response() res: express.Response) {
        return this.deleteQuestionUseCase.delete(id)
            .then(() => res.status(204).json())
            .catch((err: Error) => res.status(400).json(ResponseObject.makeErrorResponse("400", err)));
    }
}
