import { ApiModel, ApiModelProperty } from 'swagger-express-ts';
import { IsString, Matches, IsOptional } from "class-validator";

@ApiModel({
    name: "QuestionPatch"
})

export default class QuestionPatch {
    @ApiModelProperty({
        description: "Id of question",
        required: true,
    })
    @IsString()
    @Matches(/^[0-9a-fA-F]{24}$/)
    public id: string;

    @ApiModelProperty({
        description: "Name of question",
        required: false,
    })
    @IsString()
    @IsOptional()
    public name?: string;

    @ApiModelProperty({
        description: "Description of question",
        required: false,
    })
    @IsString()
    @IsOptional()
    public description?: string;

    @ApiModelProperty({
        description: "Id of QuestionCategory ",
        required: false,
    })
    @IsString()
    @IsOptional()
    public questionCategoryId?: string;

    constructor(
        id: string,
        name?: string,
        description?: string,
        questionCategoryId?: string
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.questionCategoryId = questionCategoryId;
    }
}
