import { validate } from "class-validator";
import ICreateAnswerUseCase from "@application/usecases/answer/create/ICreateAnswerUseCase";
import IAnswerRepository from '@application/repositories/IAnswerRepository';
import IAnswerDto from "@application/usecases/answer/IAnswerDto";
import IQuestionRepository from "@application/repositories/IQuestionRepository";
import Answer from "@domain/answer/Answer";

export default class CreateAnswerUseCase implements ICreateAnswerUseCase {

    private answerRepository: IAnswerRepository;
    private questionRepository: IQuestionRepository;

    constructor(
        answerRepository: IAnswerRepository,
        questionRepository: IQuestionRepository
    ) {
        this.answerRepository = answerRepository;
        this.questionRepository = questionRepository;
    }

    public async create(answerDto: IAnswerDto): Promise<IAnswerDto> {
        const answerEntity = new Answer(
            answerDto.id,
            answerDto.questionId,
            answerDto.description,
            answerDto.isRight,
            answerDto.createdAt,
            answerDto.updatedAt,
            undefined
        );

        const errors = await validate(answerEntity);
        if (errors.length > 0) throw Error("Please, check input params");

        // TODO
        // const questionExist = await this.questionRepository.read(answerEntity.questionId);
        // if (!questionExist) throw Error("Question not found");

        return await this.answerRepository.create(answerEntity);
    }
}
