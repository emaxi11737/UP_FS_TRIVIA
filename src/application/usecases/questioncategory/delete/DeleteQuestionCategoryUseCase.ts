import { validate } from 'class-validator';
import IDeleteQuestionCategoryUseCase from '@application/usecases/questioncategory/delete/IDeleteQuestionCategoryUseCase';
import IQuestionCategoryRepository from '@application/repositories/IQuestionCategoryRepository';
import QuestionCategoryPatch from '@domain/questioncategory/QuestionCategoryPatch';

export default class DeleteQuestionCategoryUseCase implements IDeleteQuestionCategoryUseCase {

    private questionCategoryRepository: IQuestionCategoryRepository;

    constructor(questionCategoryRepository: IQuestionCategoryRepository) {
        this.questionCategoryRepository = questionCategoryRepository;
    }

    public async delete(questionCategoryId: string): Promise<void> {
        const questionCategoryPatchEntity = new QuestionCategoryPatch(
            questionCategoryId,
            undefined,
            undefined
        );

        const errors = await validate(questionCategoryPatchEntity);
        if (errors.length > 0) throw Error("Please, check input params");

        const questionCategory = await this.questionCategoryRepository.read(questionCategoryId);
        if (!!questionCategory.deletedAt) return;

        questionCategory.deletedAt = new Date();

        await this.questionCategoryRepository.update(questionCategory);
    }
}
