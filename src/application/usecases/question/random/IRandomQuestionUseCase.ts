import IQuestionDto from '@application/usecases/question/IQuestionDto';
import IRandomQuestionFilterDto from '@application/usecases/question/IRandomQuestionFilterDto';
import IPaginationFilterDto from '@application/usecases/pagination/IPaginationFilterDto';

export default interface IRandomQuestionUseCase {
    random(paginationDto?: IPaginationFilterDto, filters?: IRandomQuestionFilterDto): Promise<IQuestionDto[]>;
}
