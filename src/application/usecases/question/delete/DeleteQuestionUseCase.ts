import { validate } from 'class-validator';
import IDeleteQuestionUseCase from '@application/usecases/question/delete/IDeleteQuestionUseCase';
import IQuestionRepository from '@application/repositories/IQuestionRepository';
import QuestionPatch from '@domain/question/QuestionPatch';

export default class DeleteQuestionUseCase implements IDeleteQuestionUseCase {

    private questionRepository: IQuestionRepository;

    constructor(questionRepository: IQuestionRepository) {
        this.questionRepository = questionRepository;
    }

    public async delete(questionId: string): Promise<void> {
        const questionPatchEntity = new QuestionPatch(
            questionId,
            undefined,
            undefined,
            undefined
        );

        const errors = await validate(questionPatchEntity);
        if (errors.length > 0) throw Error("Please, check input params");

        const question = await this.questionRepository.read(questionId);
        question.deletedAt = new Date();

        await this.questionRepository.update(question);
    }
}
