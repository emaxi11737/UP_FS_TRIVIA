import IAnswerDto from '@application/usecases/answer/IAnswerDto';
import IAnswerPatchDto from '@application/usecases/answer/IAnswerPatchDto';

export default interface IUpdateAnswerUseCase {
    updatePartial(answerDto: IAnswerPatchDto): Promise<IAnswerDto>;
}
