import Answer from '@domain/answer/Answer';
import Filter from '@domain/filter/Filter';
import PaginationFilter from '@domain/pagination/PaginationFilter';

export default interface IAnswerRepository {
    create(answer: Answer): Promise<Answer>;
    update(answer: Answer): Promise<Answer>;
    read(answerId: string): Promise<Answer>;
    list(pagination: PaginationFilter, filters?: Filter): Promise<Answer[]>;
}
