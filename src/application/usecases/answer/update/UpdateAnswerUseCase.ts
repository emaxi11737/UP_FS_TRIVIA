import { validate } from 'class-validator';
import IUpdateAnswerUseCase from '@application/usecases/answer/update/IUpdateAnswerUseCase';
import IAnswerRepository from '@application/repositories/IAnswerRepository';
import IAnswerPatchDto from '@application/usecases/answer/IAnswerPatchDto';
import IAnswerDto from '@application/usecases/answer/IAnswerDto';
import IQuestionRepository from '@application/repositories/IQuestionRepository';
import AnswerPatch from '@domain/answer/AnswerPatch';

export default class UpdateAnswerUseCase implements IUpdateAnswerUseCase {

    private answerRepository: IAnswerRepository;
    private questionRepository: IQuestionRepository;

    constructor(
        answerRepository: IAnswerRepository,
        questionRepository: IQuestionRepository
    ) {
        this.answerRepository = answerRepository;
        this.questionRepository = questionRepository;
    }

    public async updatePartial(answerDto: IAnswerPatchDto): Promise<IAnswerDto> {
        const answerPatchEntity = new AnswerPatch(
            answerDto.id,
            answerDto.questionId,
            answerDto.description,
            answerDto.isRight
        );

        const errors = await validate(answerPatchEntity);
        if (errors.length > 0) throw Error("Please, check input params");

        const answer = await this.answerRepository.read(answerDto.id);
        if (answerPatchEntity.questionId) {
            const questionExist = await this.questionRepository.read(answerPatchEntity.questionId);
            if (!questionExist || !!questionExist.deletedAt) throw Error("Question not found");

            answer.questionId = answerPatchEntity.questionId;
        }

        if (answerPatchEntity.description) answer.description = answerPatchEntity.description;
        if (typeof answerPatchEntity.isRight !== undefined) answer.isRight = answerPatchEntity.isRight;

        return await this.answerRepository.update(answer);
    }
}
