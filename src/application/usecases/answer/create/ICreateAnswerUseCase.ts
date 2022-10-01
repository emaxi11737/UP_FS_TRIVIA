import IAnswerDto from '@application/usecases/answer/IAnswerDto';

export default interface ICreateAnswerUseCase {
    create(answerDto: IAnswerDto): Promise<IAnswerDto>;
}
