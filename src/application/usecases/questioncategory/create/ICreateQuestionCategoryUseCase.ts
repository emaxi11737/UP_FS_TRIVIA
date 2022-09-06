import IQuestionCategoryDto from '@application/usecases/questioncategory/IQuestionCategoryDto';

export default interface ICreateQuestionCategoryUseCase {
    create(questionCategoryDto: IQuestionCategoryDto): Promise<IQuestionCategoryDto>;
}
