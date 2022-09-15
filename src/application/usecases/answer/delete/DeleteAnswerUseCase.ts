import { validate } from 'class-validator';
import IDeleteAnswerUseCase from '@application/usecases/answer/delete/IDeleteAnswerUseCase';
import IAnswerRepository from '@application/repositories/IAnswerRepository';
import AnswerRead from '@domain/answer/AnswerRead';

export default class DeleteAnswerUseCase implements IDeleteAnswerUseCase {

    private answerRepository: IAnswerRepository;

    constructor(answerRepository: IAnswerRepository) {
        this.answerRepository = answerRepository;
    }

    public async delete(answerId: string): Promise<void> {
        const answerReadEntity = new AnswerRead(
            answerId,
        );

        const errors = await validate(answerReadEntity);
        if (errors.length > 0) throw Error("Please, check input params");

        const answer = await this.answerRepository.read(answerId);
        answer.deletedAt = new Date();

        await this.answerRepository.update(answer);
    }
}
