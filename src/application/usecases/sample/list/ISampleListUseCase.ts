import ISampleListDto from '@application/usecases/sample/ISampleListDto';
import ISampleFilterDto from '@application/usecases/sample/ISampleFilterDto';
import IPaginationFilterDto from '@application/usecases/pagination/IPaginationFilterDto';

export default interface ISampleListUseCase {
    list(sampleFilter: ISampleFilterDto, pagination: IPaginationFilterDto): Promise<ISampleListDto>;
}
