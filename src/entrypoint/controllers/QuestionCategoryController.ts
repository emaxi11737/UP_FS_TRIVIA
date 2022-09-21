import * as express from "express";
import { inject } from "inversify";
import { controller, httpPost, interfaces, request, response, requestParam, httpPatch, httpGet, httpDelete } from "inversify-express-utils";
import { ApiPath, ApiOperationPost, SwaggerDefinitionConstant, ApiOperationPatch, ApiOperationDelete, ApiOperationGet } from 'swagger-express-ts';
import { TYPES } from "@constants/types";
import ResponseObject from '@helpers/ResponseObject';
import QuestionCategoryService from '@configuration/usecases/QuestionCategoryService';
import ICreateQuestionCategoryUseCase from '@application/usecases/questioncategory/create/ICreateQuestionCategoryUseCase';
import IUpdateQuestionCategoryUseCase from '@application/usecases/questioncategory/update/IUpdateQuestionCategoryUseCase';
import IListQuestionCategoryUseCase from "@application/usecases/questioncategory/list/IListQuestionCategoryUseCase";
import IDeleteQuestionCategoryUseCase from "@application/usecases/questioncategory/delete/IDeleteQuestionCategoryUseCase";
import IQuestionCategoryDto from '@application/usecases/questioncategory/IQuestionCategoryDto';
import IQuestionCategoryPatchDto from '@application/usecases/questioncategory/IQuestionCategoryPatchDto';
import IPaginationFilterDto from "@application/usecases/pagination/IPaginationFilterDto";

@ApiPath({
    path: "/questioncategories",
    name: "QuestionCategory",
    security: { BearerToken: [] },
})
@controller("/questioncategories", TYPES.LoggerMiddleware)
export default class QuestionCategoryController implements interfaces.Controller {
    private readonly createQuestionCategoryUseCase: ICreateQuestionCategoryUseCase;
    private readonly updateQuestionCategoryUseCase: IUpdateQuestionCategoryUseCase;
    private readonly listQuestionCategoryUseCase: IListQuestionCategoryUseCase;
    private readonly deleteQuestionCategoryUseCase: IDeleteQuestionCategoryUseCase;

    constructor(@inject(TYPES.QuestionCategoryService) questionCategoryService: QuestionCategoryService) {
        this.createQuestionCategoryUseCase = questionCategoryService.getCreateQuestionCategoryUseCase();
        this.updateQuestionCategoryUseCase = questionCategoryService.getUpdateQuestionCategoryUseCase();
        this.listQuestionCategoryUseCase = questionCategoryService.getListQuestionCategoryUseCase();
        this.deleteQuestionCategoryUseCase = questionCategoryService.getDeleteQuestionCategoryUseCase();
    }

    @ApiOperationPost({
        description: "Post question category object",
        parameters: {
            body: { description: "New question category", required: true, model: "QuestionCategory" }
        },
        responses: {
            201: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.OBJECT, model: "QuestionCategory" },
            400: { description: "Error", type: SwaggerDefinitionConstant.Response.Type.ARRAY },
            401: { description: "Unauthorized", type: SwaggerDefinitionConstant.Response.Type.STRING },
            403: { description: "Forbidden", type: SwaggerDefinitionConstant.Response.Type.STRING }
        },
    })
    @httpPost("/", TYPES.AdminRoleMiddleware)
    public async create(@request() req: express.Request, @response() res: express.Response) {
        const questionCategoryDto: IQuestionCategoryDto = req.body;

        return this.createQuestionCategoryUseCase.create(questionCategoryDto)
            .then((questionCategory: IQuestionCategoryDto) => res.status(201).json(ResponseObject.makeSuccessResponse(questionCategory)))
            .catch((err: Error) => res.status(400).json(ResponseObject.makeErrorResponse("400", err)));
    }

    @ApiOperationPatch({
        description: "Patch question category object",
        path: "/{id}",
        parameters: {
            path: {
                id: {
                    description: "Id of question category",
                    type: SwaggerDefinitionConstant.Parameter.Type.STRING,
                    required: true
                }
            },
            body: { description: "Update question category", required: true, model: "QuestionCategoryPatch" }
        },
        responses: {
            200: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.ARRAY, model: "QuestionCategory" },
            400: { description: "Error", type: SwaggerDefinitionConstant.Response.Type.ARRAY },
            401: { description: "Unauthorized", type: SwaggerDefinitionConstant.Response.Type.STRING },
            403: { description: "Forbidden", type: SwaggerDefinitionConstant.Response.Type.STRING }
        },
    })
    @httpPatch("/:id", TYPES.AdminRoleMiddleware)
    public async update(@requestParam("id") id: string, @request() req: express.Request, @response() res: express.Response) {
        let questionCategoryPatchDto: IQuestionCategoryPatchDto = req.body;
        questionCategoryPatchDto.id = id;

        return this.updateQuestionCategoryUseCase.updatePartial(questionCategoryPatchDto)
            .then((questionCategory: IQuestionCategoryDto) => res.status(200).json(ResponseObject.makeSuccessResponse(questionCategory)))
            .catch((err: Error) => res.status(400).json(ResponseObject.makeErrorResponse("400", err)));
    }

    @ApiOperationGet({
        description: "List question categories",
        responses: {
            200: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.ARRAY, model: "QuestionCategory" },
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

        return this.listQuestionCategoryUseCase.list(paginationDto)
            .then((questioncategories: IQuestionCategoryDto[]) => res.status(200).json(ResponseObject.makeSuccessResponse(questioncategories)))
            .catch((err: Error) => res.status(400).json(ResponseObject.makeErrorResponse("400", err)));
    }

    @ApiOperationDelete({
        description: "Delete question category object",
        path: "/{id}",
        parameters: {
            path: {
                id: {
                    description: "Id of question category",
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
        return this.deleteQuestionCategoryUseCase.delete(id)
            .then(() => res.status(204).json())
            .catch((err: Error) => res.status(400).json(ResponseObject.makeErrorResponse("400", err)));
    }
}
