import IQuestionDto from '@application/usecases/question/IQuestionDto';
import IRandomQuestionFilterDto from '@application/usecases/question/IRandomQuestionFilterDto';

export default interface IRandomQuestionUseCase {
    random(filters: IRandomQuestionFilterDto): Promise<IQuestionDto[]>;
}
