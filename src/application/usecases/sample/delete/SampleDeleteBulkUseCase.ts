import { validate } from 'class-validator';
import ISampleDeleteBulkUseCase from '@application/usecases/sample/delete/ISampleDeleteBulkUseCase';
import ISampleRepository from '@application/repositories/ISampleRepository';
import ISampleDeleteDto from '@application/usecases/sample/ISampleDeleteDto';
import SampleDelete from '@domain/sample/SampleDelete';

export default class SampleDeleteBulkUseCase implements ISampleDeleteBulkUseCase {
    
    private sampleRepository: ISampleRepository;

    constructor(sampleRepository: ISampleRepository) {
        this.sampleRepository = sampleRepository;
    }    

    public async deleteBulk(sampleDto: ISampleDeleteDto): Promise<ISampleDeleteDto> {
        const sampleEntity = new SampleDelete(sampleDto.username);

        const errors = await validate(sampleEntity);

        if (errors.length > 0) throw Error("Please, check input params");

        return await this.sampleRepository.deleteBulk(sampleEntity);
    }
}
