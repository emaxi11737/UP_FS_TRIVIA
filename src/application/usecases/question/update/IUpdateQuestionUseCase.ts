import IQuestionDto from '@application/usecases/question/IQuestionDto';
import IQuestionPatchDto from '@application/usecases/question/IQuestionPatchDto';

export default interface IUpdateQuestionUseCase {
    updatePartial(questionDto: IQuestionPatchDto): Promise<IQuestionDto>;
}
