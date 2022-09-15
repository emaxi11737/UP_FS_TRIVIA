import IListQuestionUseCase from '@application/usecases/question/list/IListQuestionUseCase';
import IQuestionDto from '@application/usecases/question/IQuestionDto';
import IQuestionRepository from '@application/repositories/IQuestionRepository';
import IPaginationFilterDto from '@application/usecases/pagination/IPaginationFilterDto';
import IFilterDto from '@application/usecases/filter/IFIlterDto';
import PaginationFilter from '@domain/pagination/PaginationFilter';

export default class ListQuestionUseCase implements IListQuestionUseCase {

    private questionRepository: IQuestionRepository;

    constructor(questionRepository: IQuestionRepository) {
        this.questionRepository = questionRepository;
    }

    public async list(paginationDto?: IPaginationFilterDto, filtersDto?: IFilterDto): Promise<IQuestionDto[]> {
        const pagination = new PaginationFilter(
            paginationDto?.limit || 10,
            paginationDto?.page || 0
        );

        return await this.questionRepository.list(pagination, filtersDto);
    }
}
