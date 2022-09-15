export default interface IDeleteQuestionsUseCase {
    delete(id: string): Promise<void>;
}
