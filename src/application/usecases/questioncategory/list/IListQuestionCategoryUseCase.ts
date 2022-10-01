import IQuestionCategoryDto from '@application/usecases/questioncategory/IQuestionCategoryDto';
import IFilterDto from '@application/usecases/filter/IFIlterDto';
import IPaginationFilterDto from '@application/usecases/pagination/IPaginationFilterDto';

export default interface IListQuestionCategoryUseCase {
    list(paginationDto?: IPaginationFilterDto, filters?: IFilterDto): Promise<IQuestionCategoryDto[]>;
}
