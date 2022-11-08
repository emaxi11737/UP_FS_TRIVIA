import { validate } from "class-validator";
import IQuestionCategoryDto from '@application/usecases/questioncategory/IQuestionCategoryDto';
import ICreateQuestionCategoryUseCase from '@application/usecases/questioncategory/create/ICreateQuestionCategoryUseCase';
import IQuestionCategoryRepository from '@application/repositories/IQuestionCategoryRepository';
import QuestionCategory from '@domain/questioncategory/QuestionCategory';

export default class CreateQuestionCategoryUseCase implements ICreateQuestionCategoryUseCase {

    private questionCategoryRepository: IQuestionCategoryRepository;

    constructor(questionCategoryRepository: IQuestionCategoryRepository) {
        this.questionCategoryRepository = questionCategoryRepository;
    }

    public async create(questionCategoryDto: IQuestionCategoryDto): Promise<IQuestionCategoryDto> {

        const questionCategoryEntity = new QuestionCategory(
            questionCategoryDto.id,
            questionCategoryDto.name,
            questionCategoryDto.description,
            questionCategoryDto.createdAt,
            questionCategoryDto.updatedAt,
            undefined
        );

        const errors = await validate(questionCategoryEntity);

        if (errors.length > 0) throw Error("Please, check input params");

        return await this.questionCategoryRepository.create(questionCategoryEntity);
    }
}
