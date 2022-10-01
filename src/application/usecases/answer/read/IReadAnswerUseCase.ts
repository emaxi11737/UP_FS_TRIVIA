import IAnswerDto from '@application/usecases/answer/IAnswerDto';

export default interface IReadAnswerUseCase {
    read(answerId: string): Promise<IAnswerDto>;
}
