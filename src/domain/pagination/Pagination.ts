import { ApiModel, ApiModelProperty } from 'swagger-express-ts';
import { IsNumber, IsOptional } from "class-validator";

@ApiModel({
    name : "Pagination"
})

export default class Pagination {
    @ApiModelProperty({
        description : "Total" ,
        required : false,
        type: "number"
    })
    @IsOptional()
    @IsNumber()
    public total: number;

    @ApiModelProperty({
        description : "Limit" ,
        required : false,
        type: "number"
    })
    @IsOptional()
    @IsNumber()
    public limit: number;

    @ApiModelProperty({
        description : "Offset" ,
        required : false,
        type: "number"
    })
    @IsOptional()
    @IsNumber()
    public offset: number;
    
    @ApiModelProperty({
        description : "Page" ,
        required : false,
        type: "number"
    })
    @IsOptional()
    @IsNumber()
    public page: number;

    @ApiModelProperty({
        description : "Pages" ,
        required : false,
        type: "number"
    })
    @IsOptional()
    @IsNumber()
    public pages: number;

    constructor(
        limit: number,
        offset: number,
        page: number,
        pages: number,
        total: number,
    ) {
        this.limit = limit;
        this.offset = offset;
        this.page = page;        
        this.pages = pages;
        this.total = total;
    }
}
