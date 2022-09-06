import { injectable, inject } from "inversify";
import { TYPES } from "@constants/types";
import IQuestionCategoryRepository from '@application/repositories/IQuestionCategoryRepository';
import CreateQuestionCategoryUseCase from '@application/usecases/questioncategory/create/CreateQuestionCategoryUseCase';
import UpdateQuestionCategoryUseCase from '@application/usecases/questioncategory/update/UpdateQuestionCategoryUseCase';

@injectable()
export default class QuestionCategoryService {

    constructor(@inject(TYPES.IQuestionCategoryRepository) private questionCategoryRepository: IQuestionCategoryRepository) {}

    public getCreateQuestionCategoryUseCase() {
        return new CreateQuestionCategoryUseCase(this.questionCategoryRepository);
    }

    public getUpdateQuestionCategoryUseCase() {
        return new UpdateQuestionCategoryUseCase(this.questionCategoryRepository);
    }
}
