import IPaginationDto from '@application/usecases/pagination/IPaginationDto';
import ISampleDto from '@application/usecases/sample/ISampleDto';

export default interface ISampleListDto {
    samples: ISampleDto[];
    pagination: IPaginationDto;
}
