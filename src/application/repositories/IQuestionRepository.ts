import Question from '@domain/question/Question';
import QuestionFilter from '@domain/question/QuestionFilter';
import PaginationFilter from '@domain/pagination/PaginationFilter';

export default interface IQuestionRepository {
    create(question: Question): Promise<Question>;
    read(questionId: string): Promise<Question>;
    update(question: Question): Promise<Question>;
    list(pagination: PaginationFilter, filters?: QuestionFilter): Promise<Question[]>;
}
