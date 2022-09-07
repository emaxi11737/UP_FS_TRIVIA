import { validate } from "class-validator";
import IQuestionDto from '@application/usecases/question/IQuestionDto';
import ICreateQuestionUseCase from '@application/usecases/question/create/ICreateQuestionUseCase';
import IQuestionRepository from '@application/repositories/IQuestionRepository';
import Question from '@domain/question/Question';

export default class CreateQuestionUseCase implements ICreateQuestionUseCase {

    private questionRepository: IQuestionRepository;

    constructor(questionRepository: IQuestionRepository) {
        this.questionRepository = questionRepository;
    }

    public async create(questionDto: IQuestionDto): Promise<IQuestionDto> {

        const questionEntity = new Question(
            questionDto.id,
            questionDto.name,
            questionDto.description,
            questionDto.questionCategoryId,
            questionDto.createdAt,
            questionDto.updatedAt
        );

        const errors = await validate(questionEntity);

        if (errors.length > 0) throw Error("Please, check input params");

        return await this.questionRepository.create(questionEntity);
    }
}
