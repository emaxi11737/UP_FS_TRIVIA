import IAnswerDto from '@application/usecases/answer/IAnswerDto';
import IAnswerFilterDto from '@application/usecases/answer/IAnswerFilterDto';
import IPaginationFilterDto from '@application/usecases/pagination/IPaginationFilterDto';

export default interface IListAnswerUseCase {
    list(paginationDto?: IPaginationFilterDto, filters?: IAnswerFilterDto): Promise<IAnswerDto[]>;
}
