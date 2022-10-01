import { ApiModel, ApiModelProperty } from 'swagger-express-ts';
import { IsArray, IsNumber } from "class-validator";

@ApiModel({
    name: "RandomQuestionFilter"
})

export default class RandomQuestionFilter {
    @ApiModelProperty({
        description: "Question category id of question",
        required: true,
    })
    @IsArray()
    public questionCategoriesId: Array<string>

    @ApiModelProperty({
        description: "Level of questions",
        required: true,
    })
    @IsNumber()
    public level: number

    @ApiModelProperty({
        description: "Amount of questions",
        required: true,
    })
    @IsNumber()
    public size: number

    constructor(
        questionCategoriesId: Array<string>,
        level: number,
        size: number
    ) {
        this.questionCategoriesId = questionCategoriesId;
        this.level = level;
        this.size = size;
    }
}
