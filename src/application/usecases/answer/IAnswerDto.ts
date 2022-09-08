export default interface IAnswerDto {
    id: string;
    questionId: string;
    description: string;
    isRight: boolean;
    createdAt: Date;
    updatedAt: Date;
}
