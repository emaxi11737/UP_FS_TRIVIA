import IQuestionDto from '@application/usecases/question/IQuestionDto';
import IFilterDto from '@application/usecases/filter/IFIlterDto';
import IPaginationFilterDto from '@application/usecases/pagination/IPaginationFilterDto';

export default interface IListQuestionUseCase {
    list(paginationDto?: IPaginationFilterDto, filters?: IFilterDto): Promise<IQuestionDto[]>;
}
