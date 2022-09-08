export default interface IAnswerPatchDto {
    id: string,
    questionId?: string;
    description?: string;
    isRight?: boolean;
}
