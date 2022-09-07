import * as express from "express";
import { inject } from "inversify";
import { controller, httpPost, interfaces, request, response, requestParam, httpPatch } from "inversify-express-utils";
import { ApiPath, ApiOperationPost, SwaggerDefinitionConstant, ApiOperationPatch } from 'swagger-express-ts';
import { TYPES } from "@constants/types";
import ResponseObject from '@helpers/ResponseObject';
import ICreateQuestionCategoryUseCase from '@application/usecases/questioncategory/create/ICreateQuestionCategoryUseCase';
import IUpdateQuestionCategoryUseCase from '@application/usecases/questioncategory/update/IUpdateQuestionCategoryUseCase';
import QuestionCategoryService from '@configuration/usecases/QuestionCategoryService';
import IQuestionCategoryDto from '@application/usecases/questioncategory/IQuestionCategoryDto';
import IQuestionCategoryPatchDto from '@application/usecases/questioncategory/IQuestionCategoryPatchDto';

@ApiPath({
    path: "/questioncategories",
    name: "QuestionCategory",
})
@controller("/questioncategories")
export default class QuestionCategoryController implements interfaces.Controller {
    private readonly createQuestionCategoryUseCase: ICreateQuestionCategoryUseCase;
    private readonly updateQuestionCategoryUseCase: IUpdateQuestionCategoryUseCase;

    constructor(@inject(TYPES.QuestionCategoryService) questionCategoryService: QuestionCategoryService) {
        this.createQuestionCategoryUseCase = questionCategoryService.getCreateQuestionCategoryUseCase();
        this.updateQuestionCategoryUseCase = questionCategoryService.getUpdateQuestionCategoryUseCase();
    }

    @ApiOperationPost({
        description: "Post question category object",
        parameters: {
            body: { description: "New question category", required: true, model: "QuestionCategory" }
        },
        responses: {
            201: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.OBJECT, model: "QuestionCategory" },
            400: { description: "Error", type: SwaggerDefinitionConstant.Response.Type.ARRAY }
        },
    })
    @httpPost("/")
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
            400: { description: "Error", type: SwaggerDefinitionConstant.Response.Type.ARRAY }
        },
    })
    @httpPatch("/:id")
    public async updatePartial(@requestParam("id") id: string, @request() req: express.Request, @response() res: express.Response) {
        let questionCategoryPatchDto: IQuestionCategoryPatchDto = req.body;
        questionCategoryPatchDto.id = id;

        return this.updateQuestionCategoryUseCase.updatePartial(questionCategoryPatchDto)
            .then((questionCategory: IQuestionCategoryDto) => res.status(200).json(ResponseObject.makeSuccessResponse(questionCategory)))
            .catch((err: Error) => res.status(400).json(ResponseObject.makeErrorResponse("400", err)));
    }
}