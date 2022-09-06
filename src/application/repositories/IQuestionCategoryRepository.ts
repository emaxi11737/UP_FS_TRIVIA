import QuestionCategory from '@domain/questioncategory/QuestionCategory';
import QuestionCategoryPatch from '@domain/questioncategory/QuestionCategoryPatch';

export default interface IQuestionCategoryRepository {
    create(questionCategory: QuestionCategory): Promise<QuestionCategory>;
    read(questionCategory: QuestionCategory): Promise<QuestionCategory>;
    updatePartial(questionCategory: QuestionCategoryPatch): Promise<QuestionCategory>;
}
