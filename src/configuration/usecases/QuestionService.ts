import { injectable, inject } from "inversify";
import { TYPES } from "@constants/types";
import IQuestionRepository from '@application/repositories/IQuestionRepository';
import CreateQuestionUseCase from '@application/usecases/question/create/CreateQuestionUseCase';
import UpdateQuestionUseCase from '@application/usecases/question/update/UpdateQuestionUseCase';

@injectable()
export default class QuestionService {

    constructor(@inject(TYPES.IQuestionRepository) private questionRepository: IQuestionRepository) {}

    public getCreateQuestionUseCase() {
        return new CreateQuestionUseCase(this.questionRepository);
    }

    public getUpdateQuestionUseCase() {
        return new UpdateQuestionUseCase(this.questionRepository);
    }
}
