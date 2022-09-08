import IAnswerDto from '@application/usecases/answer/IAnswerDto';
import Answer from '@domain/answer/Answer';

export default class AnswerMongoDBMapper {

    public static toEntity(answerMapper: IAnswerDto): Answer {
        const { id, questionId, description, isRight, createdAt, updatedAt } = answerMapper;

        const answerEntity = new Answer(id, questionId, description, isRight, createdAt, updatedAt);

        return answerEntity;
    }
}
