import IListQuestionCategoryUseCase from '@application/usecases/questioncategory/list/IListQuestionCategoryUseCase';
import IQuestionCategoryDto from '@application/usecases/questioncategory/IQuestionCategoryDto';
import IQuestionCategoryRepository from '@application/repositories/IQuestionCategoryRepository';
import IPaginationFilterDto from '@application/usecases/pagination/IPaginationFilterDto';
import IFilterDto from '@application/usecases/filter/IFIlterDto';
import PaginationFilter from '@domain/pagination/PaginationFilter';

export default class ListQuestionCategoryUseCase implements IListQuestionCategoryUseCase {

    private questionCategoryRepository: IQuestionCategoryRepository;

    constructor(questionCategoryRepository: IQuestionCategoryRepository) {
        this.questionCategoryRepository = questionCategoryRepository;
    }

    public async list(paginationDto?: IPaginationFilterDto, filtersDto?: IFilterDto): Promise<IQuestionCategoryDto[]> {
        const pagination = new PaginationFilter(
            paginationDto?.limit || 10,
            paginationDto?.page || 0
        );

        return await this.questionCategoryRepository.list(pagination, filtersDto);
    }
}
