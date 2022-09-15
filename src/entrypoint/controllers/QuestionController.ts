import * as express from "express";
import { inject } from "inversify";
import { controller, httpPost, interfaces, request, response, requestParam, httpPatch } from "inversify-express-utils";
import { ApiPath, ApiOperationPost, SwaggerDefinitionConstant, ApiOperationPatch } from 'swagger-express-ts';
import { TYPES } from "@constants/types";
import ResponseObject from '@helpers/ResponseObject';
import ICreateQuestionUseCase from '@application/usecases/question/create/ICreateQuestionUseCase';
import IUpdateQuestionUseCase from '@application/usecases/question/update/IUpdateQuestionUseCase';
import QuestionService from '@configuration/usecases/QuestionService';
import IQuestionDto from '@application/usecases/question/IQuestionDto';
import IQuestionPatchDto from '@application/usecases/question/IQuestionPatchDto';

@ApiPath({
    path: "/question",
    name: "Question",
})
@controller("/question", TYPES.LoggerMiddleware)
export default class QuestionController implements interfaces.Controller {
    private readonly createQuestionUseCase: ICreateQuestionUseCase;
    private readonly updateQuestionUseCase: IUpdateQuestionUseCase;

    constructor(@inject(TYPES.QuestionService) questionService: QuestionService) {
        this.createQuestionUseCase = questionService.getCreateQuestionUseCase();
        this.updateQuestionUseCase = questionService.getUpdateQuestionUseCase();
    }

    @ApiOperationPost({
        description: "Post question object",
        parameters: {
            body: { description: "New question ", required: true, model: "Question" }
        },
        responses: {
            201: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.OBJECT, model: "Question" },
            400: { description: "Error", type: SwaggerDefinitionConstant.Response.Type.ARRAY }
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
        description: "Patch question object",
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
            400: { description: "Error", type: SwaggerDefinitionConstant.Response.Type.ARRAY }
        },
    })
    @httpPatch("/:id")
    public async updatePartial(@requestParam("id") id: string, @request() req: express.Request, @response() res: express.Response) {
        let questionPatchDto: IQuestionPatchDto = req.body;
        questionPatchDto.id = id;

        return this.updateQuestionUseCase.updatePartial(questionPatchDto)
            .then((question: IQuestionDto) => res.status(200).json(ResponseObject.makeSuccessResponse(question)))
            .catch((err: Error) => res.status(400).json(ResponseObject.makeErrorResponse("400", err)));
    }
}
