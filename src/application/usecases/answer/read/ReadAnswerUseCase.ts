import { validate } from 'class-validator';
import IReadAnswerUseCase from '@application/usecases/answer/read/IReadAnswerUseCase';
import IAnswerDto from '@application/usecases/answer/IAnswerDto';
import IAnswerRepository from '@application/repositories/IAnswerRepository';
import AnswerRead from '@domain/answer/AnswerRead';

export default class ReadAnswerUseCase implements IReadAnswerUseCase {

    private answerRepository: IAnswerRepository;

    constructor(answerRepository: IAnswerRepository) {
        this.answerRepository = answerRepository;
    }

    public async read(answerId: string): Promise<IAnswerDto> {
        const answerReadEntity = new AnswerRead(
            answerId,
        );

        const errors = await validate(answerReadEntity);
        if (errors.length > 0) throw Error("Please, check input params");

        return await this.answerRepository.read(answerReadEntity.id);
    }
}
