import { validate } from 'class-validator';
import IDeleteQuestionUseCase from '@application/usecases/question/delete/IDeleteQuestionUseCase';
import IQuestionRepository from '@application/repositories/IQuestionRepository';
import IAnswerRepository from '@application/repositories/IAnswerRepository';
import QuestionPatch from '@domain/question/QuestionPatch';
import AnswerFilter from '@domain/answer/AnswerFilter';

export default class DeleteQuestionUseCase implements IDeleteQuestionUseCase {

    private questionRepository: IQuestionRepository;
    private answerRepository: IAnswerRepository;

    constructor(
        questionRepository: IQuestionRepository,
        answerRepository: IAnswerRepository,
    ) {
        this.questionRepository = questionRepository;
        this.answerRepository = answerRepository;
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
        if (!!question.deletedAt) return;

        question.deletedAt = new Date();

        const questionDeleted = await this.questionRepository.update(question);
        if (!!questionDeleted) {
            // get answers by questionId and update deleted at
            const answerFilter = new AnswerFilter(question.id);
            const allAnswersByQuestionId = await this.answerRepository.findAll(answerFilter);

            for (let answerEntity of allAnswersByQuestionId) {
                const answer = await this.answerRepository.read(answerEntity.id);
                if (!!answer.deletedAt) continue;

                answer.deletedAt = new Date();

                await this.answerRepository.update(answer);
            }
        }
    }
}
