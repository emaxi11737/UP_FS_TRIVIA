import IQuestionCategoryDto from '@application/usecases/questioncategory/IQuestionCategoryDto';
import IQuestionCategoryPatchDto from '@application/usecases/questioncategory/IQuestionCategoryPatchDto';

export default interface IUpdateQuestionCategoryUseCase {
    updatePartial(questionCategoryDto: IQuestionCategoryPatchDto): Promise<IQuestionCategoryDto>;
}
