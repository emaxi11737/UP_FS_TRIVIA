import { validate } from 'class-validator';
import ISampleCreateBulkUseCase from '@application/usecases/sample/create/ISampleCreateBulkUseCase';
import ISampleDto from '@application/usecases/sample/ISampleDto';
import ISampleRepository from '@application/repositories/ISampleRepository';
import Sample from '@domain/sample/Sample';

export default class SampleCreateBulkUseCase implements ISampleCreateBulkUseCase {
    
    private sampleRepository: ISampleRepository;

    constructor(sampleRepository: ISampleRepository) {
        this.sampleRepository = sampleRepository;
    }    

    public async createBulk(samples: ISampleDto[]): Promise<ISampleDto[]> {
        if (! Array.isArray(samples)) throw Error("Please, check input params");

        const sampleEntities = samples.map((sampleDto: ISampleDto) => {
            const sampleEntity = new Sample(
                sampleDto.id,
                sampleDto.project,
                sampleDto.sampleId,
                sampleDto.countryName,
                sampleDto.regionName,
                sampleDto.senderName,
                sampleDto.username,
                sampleDto.harvestYear,
                sampleDto.comments,
                sampleDto.receptionDate,
                sampleDto.labelName,
                sampleDto.commodityName,
                sampleDto.createdAt,
                sampleDto.updatedAt
            );

            return sampleEntity;
        });

        for (let index = 0; index < sampleEntities.length; index++) {
            const sampleEntity = sampleEntities[index];

            const errors = await validate(sampleEntity);

            if (errors.length > 0) throw Error("Please, check input params"); 
        }        

        return await this.sampleRepository.createBulk(sampleEntities);
    }
}
