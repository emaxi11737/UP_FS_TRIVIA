import IQuestionDto from '@application/usecases/question/IQuestionDto';
import IQuestionFilterDto from '@application/usecases/question/IQuestionFilterDto';
import IPaginationFilterDto from '@application/usecases/pagination/IPaginationFilterDto';

export default interface IListQuestionUseCase {
    list(paginationDto?: IPaginationFilterDto, filters?: IQuestionFilterDto): Promise<IQuestionDto[]>;
}
