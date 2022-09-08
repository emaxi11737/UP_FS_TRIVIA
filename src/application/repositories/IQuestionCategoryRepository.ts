import QuestionCategory from '@domain/questioncategory/QuestionCategory';

export default interface IQuestionCategoryRepository {
    create(questionCategory: QuestionCategory): Promise<QuestionCategory>;
    read(id: string): Promise<QuestionCategory>;
    update(questionCategory: QuestionCategory): Promise<QuestionCategory>;
}
