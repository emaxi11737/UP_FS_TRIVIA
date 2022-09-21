import Answer from '@domain/answer/Answer';
import AnswerFilter from '@domain/answer/AnswerFilter';
import PaginationFilter from '@domain/pagination/PaginationFilter';

export default interface IAnswerRepository {
    create(answer: Answer): Promise<Answer>;
    update(answer: Answer): Promise<Answer>;
    read(answerId: string): Promise<Answer>;
    list(pagination: PaginationFilter, filters?: AnswerFilter): Promise<Answer[]>;
}
