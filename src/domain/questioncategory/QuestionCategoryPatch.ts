import { ApiModel, ApiModelProperty } from 'swagger-express-ts';
import { IsString, Matches, IsOptional } from "class-validator";

@ApiModel({
    name: "QuestionCategoryPatch"
})

export default class QuestionCategoryPatch {
    @ApiModelProperty({
        description: "Id of question category",
        required: true,
    })
    @IsString()
    @Matches(/^[0-9a-fA-F]{24}$/)
    public id: string;

    @ApiModelProperty({
        description: "Name of question category",
        required: false,
    })
    @IsString()
    @IsOptional()
    public name?: string;

    @ApiModelProperty({
        description: "Description of question category",
        required: false,
    })
    @IsString()
    @IsOptional()
    public description?: string;

    constructor(
        id: string,
        name?: string,
        description?: string
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
    }
}
