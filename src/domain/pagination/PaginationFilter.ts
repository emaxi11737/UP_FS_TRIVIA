import { ApiModel, ApiModelProperty } from 'swagger-express-ts';
import { IsNumber } from "class-validator";

@ApiModel({
    name : "PaginationFilter"
})

export default class PaginationFilter {
    @ApiModelProperty({
        description : "Limit" ,
        required : false,
        type: "number"
    })
    @IsNumber()
    public limit: number;

    @ApiModelProperty({
        description : "Page" ,
        required : false,
        type: "number"
    })
    @IsNumber()
    public page: number;

    constructor(
        limit: number,
        page: number,
    ) {
        this.limit = limit;
        this.page = page;        
    }
}
