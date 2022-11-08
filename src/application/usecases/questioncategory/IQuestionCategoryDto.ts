export default interface IQuestionCategoryDto {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
}
