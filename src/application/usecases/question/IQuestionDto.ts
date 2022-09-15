export default interface IQuestionDto {
    id: string;
    name: string;
    description: string;
    questionCategoryId: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
