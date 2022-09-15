import { validate } from "class-validator";
import IQuestionDto from '@application/usecases/question/IQuestionDto';
import ICreateQuestionUseCase from '@application/usecases/question/create/ICreateQuestionUseCase';
import IQuestionRepository from '@application/repositories/IQuestionRepository';
import IQuestionCategoryRepository from '@application/repositories/IQuestionCategoryRepository';
import Question from '@domain/question/Question';

export default class CreateQuestionUseCase implements ICreateQuestionUseCase {

    private questionRepository: IQuestionRepository;
    private questionCategoryRepository: IQuestionCategoryRepository;

    constructor(questionRepository: IQuestionRepository,
        questionCategoryRepository: IQuestionCategoryRepository) {
        this.questionRepository = questionRepository;
        this.questionCategoryRepository = questionCategoryRepository;
    }

    public async create(questionDto: IQuestionDto): Promise<IQuestionDto> {

        const questionEntity = new Question(
            questionDto.id,
            questionDto.name,
            questionDto.description,
            questionDto.questionCategoryId,
            questionDto.createdAt,
            questionDto.updatedAt,
            questionDto.deletedAt
        );

        const errors = await validate(questionEntity);

        if (errors.length > 0) throw Error("Please, check input params");

        const questionCategoryExist = await this.questionCategoryRepository.read(questionEntity.questionCategoryId);
        if (!questionCategoryExist) throw Error("Question Category not found");

        return await this.questionRepository.create(questionEntity);
    }
}
