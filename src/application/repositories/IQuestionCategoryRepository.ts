import QuestionCategory from '@domain/questioncategory/QuestionCategory';
import Filter from '@domain/filter/Filter';
import PaginationFilter from '@domain/pagination/PaginationFilter';

export default interface IQuestionCategoryRepository {
    create(questionCategory: QuestionCategory): Promise<QuestionCategory>;
    read(questionCategoryId: string): Promise<QuestionCategory>;
    update(questionCategory: QuestionCategory): Promise<QuestionCategory>;
    list(pagination: PaginationFilter, filters?: Filter): Promise<QuestionCategory[]>;
}
