import { injectable, inject } from "inversify";
import { TYPES } from "@constants/types";
import IQuestionCategoryRepository from '@application/repositories/IQuestionCategoryRepository';
import CreateQuestionCategoryUseCase from '@application/usecases/questioncategory/create/CreateQuestionCategoryUseCase';
import UpdateQuestionCategoryUseCase from '@application/usecases/questioncategory/update/UpdateQuestionCategoryUseCase';
import DeleteQuestionCategoryUseCase from "@application/usecases/questioncategory/delete/DeleteQuestionCategoryUseCase";
import ListQuestionCategoryUseCase from "@application/usecases/questioncategory/list/ListQuestionCategoryUseCase";
import IQuestionRepository from "@application/repositories/IQuestionRepository";
import IAnswerRepository from "@application/repositories/IAnswerRepository";

@injectable()
export default class QuestionCategoryService {

    constructor(
        @inject(TYPES.IQuestionCategoryRepository) private questionCategoryRepository: IQuestionCategoryRepository,
        @inject(TYPES.IQuestionRepository) private questionRepository: IQuestionRepository,
        @inject(TYPES.IAnswerRepository) private answerRepository: IAnswerRepository,
    ) { }

    public getCreateQuestionCategoryUseCase() {
        return new CreateQuestionCategoryUseCase(this.questionCategoryRepository);
    }

    public getUpdateQuestionCategoryUseCase() {
        return new UpdateQuestionCategoryUseCase(this.questionCategoryRepository);
    }

    public getDeleteQuestionCategoryUseCase() {
        return new DeleteQuestionCategoryUseCase(
            this.questionCategoryRepository,
            this.questionRepository,
            this.answerRepository
        );
    }

    public getListQuestionCategoryUseCase() {
        return new ListQuestionCategoryUseCase(this.questionCategoryRepository);
    }
}
