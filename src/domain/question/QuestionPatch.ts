import { ApiModel, ApiModelProperty } from 'swagger-express-ts';
import { IsNumber, IsString, Matches } from "class-validator";

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
        required: true,
    })
    @IsString()
    public name: string;

    @ApiModelProperty({
        description: "Description of question",
        required: true,
    })
    @IsString()
    public description: string;

    @ApiModelProperty({
        description: "Id of QuestionCategory ",
        required: true,
    })
    @IsNumber()
    public questionCategoryId: number;

    constructor(
        id: string,
        name: string,
        description: string,
        questionCategoryId: number
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.questionCategoryId = questionCategoryId;
    }
}
