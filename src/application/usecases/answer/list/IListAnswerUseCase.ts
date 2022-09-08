import IAnswerDto from '@application/usecases/answer/IAnswerDto';
import IFilterDto from '@application/usecases/filter/IFIlterDto';
import IPaginationFilterDto from '@application/usecases/pagination/IPaginationFilterDto';

export default interface IListAnswerUseCase {
    list(paginationDto?: IPaginationFilterDto, filters?: IFilterDto): Promise<IAnswerDto[]>;
}
