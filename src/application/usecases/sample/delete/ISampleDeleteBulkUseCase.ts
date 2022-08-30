import ISampleDeleteDto from '@application/usecases/sample/ISampleDeleteDto';

export default interface ISampleDeleteBulkUseCase {
    deleteBulk(sampleDto: ISampleDeleteDto): Promise<ISampleDeleteDto>;
}
