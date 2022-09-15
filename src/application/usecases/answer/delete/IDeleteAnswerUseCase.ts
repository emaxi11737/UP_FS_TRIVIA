export default interface DeleteAnswerUseCase {
    delete(id: string): Promise<void>;
}
