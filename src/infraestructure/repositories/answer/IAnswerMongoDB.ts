export default interface IAnswerMongoDB {
    questionId?: string;
    description?: string;
    isRight?: boolean;
    deletedAt?: Date;
}
