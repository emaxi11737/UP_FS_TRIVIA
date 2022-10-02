import { injectable, inject } from "inversify";
import { TYPES } from "@constants/types";
import IQuestionRepository from '@application/repositories/IQuestionRepository';
import CreateQuestionUseCase from '@application/usecases/question/create/CreateQuestionUseCase';
import UpdateQuestionUseCase from '@application/usecases/question/update/UpdateQuestionUseCase';
import DeleteQuestionUseCase from '@application/usecases/question/delete/DeleteQuestionUseCase';
import ListQuestionUseCase from '@application/usecases/question/list/ListQuestionUseCase';
import RandomQuestionUseCase from '@application/usecases/question/random/RandomQuestionUseCase';
import IQuestionCategoryRepository from "@application/repositories/IQuestionCategoryRepository";
import IAnswerRepository from "@application/repositories/IAnswerRepository";

@injectable()
export default class QuestionService {

    constructor(
        @inject(TYPES.IQuestionRepository) private questionRepository: IQuestionRepository,
        @inject(TYPES.IQuestionCategoryRepository) private questionCategoryRepository: IQuestionCategoryRepository,
        @inject(TYPES.IAnswerRepository) private answerRepository: IAnswerRepository
    ) { }

    public getCreateQuestionUseCase() {
        return new CreateQuestionUseCase(this.questionRepository, this.questionCategoryRepository);
    }

    public getUpdateQuestionUseCase() {
        return new UpdateQuestionUseCase(this.questionRepository, this.questionCategoryRepository);
    }

    public getDeleteQuestionUseCase() {
        return new DeleteQuestionUseCase(this.questionRepository, this.answerRepository);
    }

    public getListQuestionUseCase() {
        return new ListQuestionUseCase(this.questionRepository);
    }

    public getRandomQuestionUseCase() {
        return new RandomQuestionUseCase(this.questionRepository, this.questionCategoryRepository);
    }
}

