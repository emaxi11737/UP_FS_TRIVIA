import ISampleDto from '@application/usecases/sample/ISampleDto';

export default interface ISampleCreateBulkUseCase {
    createBulk(samples: ISampleDto[]): Promise<ISampleDto[]>;
}
