import { validate } from 'class-validator';
import ISampleListUseCase from '@application/usecases/sample/list/ISampleListUseCase';
import ISampleRepository from '@application/repositories/ISampleRepository';
import ISampleFilterDto from '@application/usecases/sample/ISampleFilterDto';
import ISampleListDto from '@application/usecases/sample/ISampleListDto';
import IPaginationFilterDto from '@application/usecases/pagination/IPaginationFilterDto';
import SampleFilter from '@domain/sample/SampleFilter';
import PaginationFilter from '@domain/pagination/PaginationFilter';
import { PAGINATION } from '@constants/pagination';

export default class SampleListUseCase implements ISampleListUseCase {

    private sampleRepository: ISampleRepository;

    constructor(sampleRepository: ISampleRepository) {
        this.sampleRepository = sampleRepository;
    }    

    public async list(sampleFilterDto: ISampleFilterDto, paginationDto: IPaginationFilterDto): Promise<ISampleListDto> {
        const sampleFilterEntity = new SampleFilter(
            sampleFilterDto.project,
            parseInt(sampleFilterDto.sampleId) || undefined,
            sampleFilterDto.countryName,
            sampleFilterDto.regionName,
            sampleFilterDto.senderName,
            sampleFilterDto.username,
            sampleFilterDto.labelName,
            sampleFilterDto.commodityName
        );

        const paginationEntity = new PaginationFilter(
            parseInt(paginationDto.limit) || PAGINATION.LIMIT,
            parseInt(paginationDto.page) || PAGINATION.PAGE,
        );
        
        const errorsSampleFilterEntity = await validate(sampleFilterEntity);
        const errorsPaginationEntity = await validate(paginationEntity);
        
        if (errorsSampleFilterEntity.length > 0 || errorsPaginationEntity.length > 0) throw Error("Please, check input params"); 

        return await this.sampleRepository.list(sampleFilterEntity, paginationEntity);
    }
}
