import { injectable, inject } from "inversify";
import { TYPES } from "@constants/types";
import IQuestionRepository from '@application/repositories/IQuestionRepository';
import CreateQuestionUseCase from '@application/usecases/question/create/CreateQuestionUseCase';
import UpdateQuestionUseCase from '@application/usecases/question/update/UpdateQuestionUseCase';
import DeleteQuestionUseCase from '@application/usecases/question/delete/DeleteQuestionUseCase';
import ListQuestionUseCase from '@application/usecases/question/list/ListQuestionUseCase';

@injectable()
export default class QuestionService {

    constructor(@inject(TYPES.IQuestionRepository) private questionRepository: IQuestionRepository) {}

    public getCreateQuestionUseCase() {
        return new CreateQuestionUseCase(this.questionRepository);
    }

    public getUpdateQuestionUseCase() {
        return new UpdateQuestionUseCase(this.questionRepository);
    }

    public getDeleteQuestionUseCase() {
        return new DeleteQuestionUseCase(this.questionRepository);
    }

    public getListQuestionUseCase() {
        return new ListQuestionUseCase(this.questionRepository);
    }
}

