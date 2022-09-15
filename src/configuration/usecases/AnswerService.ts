import { injectable, inject } from "inversify";
import { TYPES } from "@constants/types";
import IAnswerRepository from '@application/repositories/IAnswerRepository';
import CreateAnswerUseCase from "@application/usecases/answer/create/CreateAnswerUseCase";
import UpdateAnswerUseCase from "@application/usecases/answer/update/UpdateAnswerUseCase";
import ReadAnswerUseCase from "@application/usecases/answer/read/ReadAnswerUseCase";
import IQuestionRepository from "@application/repositories/IQuestionRepository";
import ListAnswerUseCase from "@application/usecases/answer/list/ListAnswerUseCase";
import DeleteAnswerUseCase from "@application/usecases/answer/delete/DeleteAnswerUseCase";

@injectable()
export default class AnswerService {

    constructor(
        @inject(TYPES.IAnswerRepository) private answerRepository: IAnswerRepository,
        @inject(TYPES.IQuestionRepository) private questionRepository: IQuestionRepository
    ) { }

    public getCreateAnswerUseCase() {
        return new CreateAnswerUseCase(this.answerRepository, this.questionRepository);
    }

    public getUpdateAnswerUseCase() {
        return new UpdateAnswerUseCase(this.answerRepository, this.questionRepository);
    }

    public getReadAnswerUseCase() {
        return new ReadAnswerUseCase(this.answerRepository);
    }

    public getListAnswerUseCase() {
        return new ListAnswerUseCase(this.answerRepository);
    }

    public getDeleteAnswerUseCase() {
        return new DeleteAnswerUseCase(this.answerRepository);
    }
}
