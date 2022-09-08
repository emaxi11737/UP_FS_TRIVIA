import IListAnswerUseCase from '@application/usecases/answer/list/IListAnswerUseCase';
import IAnswerDto from '@application/usecases/answer/IAnswerDto';
import IAnswerRepository from '@application/repositories/IAnswerRepository';
import IPaginationFilterDto from '@application/usecases/pagination/IPaginationFilterDto';
import IFilterDto from '@application/usecases/filter/IFIlterDto';
import PaginationFilter from '@domain/pagination/PaginationFilter';

export default class ListAnswerUseCase implements IListAnswerUseCase {

    private answerRepository: IAnswerRepository;

    constructor(answerRepository: IAnswerRepository) {
        this.answerRepository = answerRepository;
    }

    public async list(paginationDto?: IPaginationFilterDto, filtersDto?: IFilterDto): Promise<IAnswerDto[]> {
        const pagination = new PaginationFilter(
            paginationDto?.limit || 10,
            paginationDto?.page || 0
        );

        return await this.answerRepository.list(pagination, filtersDto);
    }
}
