import { validate } from 'class-validator';
import IUpdateQuestionCategoryUseCase from '@application/usecases/questioncategory/update/IUpdateQuestionCategoryUseCase';
import IQuestionCategoryDto from '@application/usecases/questioncategory/IQuestionCategoryDto';
import IQuestionCategoryPatchDto from '@application/usecases/questioncategory/IQuestionCategoryPatchDto';
import IQuestionCategoryRepository from '@application/repositories/IQuestionCategoryRepository';
import QuestionCategoryPatch from '@domain/questioncategory/QuestionCategoryPatch';

export default class UpdateQuestionCategoryUseCase implements IUpdateQuestionCategoryUseCase {

    private questionCategoryRepository: IQuestionCategoryRepository;

    constructor(questionCategoryRepository: IQuestionCategoryRepository) {
        this.questionCategoryRepository = questionCategoryRepository;
    }

    public async updatePartial(questionCategoryDto: IQuestionCategoryPatchDto): Promise<IQuestionCategoryDto> {
        const questionCategoryPatchEntity = new QuestionCategoryPatch(
            questionCategoryDto.id,
            questionCategoryDto.name,
            questionCategoryDto.description
        );

        const errors = await validate(questionCategoryPatchEntity);

        if (errors.length > 0) throw Error("Please, check input params");

        return await this.questionCategoryRepository.updatePartial(questionCategoryPatchEntity);
    }
}