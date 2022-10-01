import { ApiModel, ApiModelProperty } from 'swagger-express-ts';
import { IsArray, IsEnum, IsNotEmpty, IsNumber } from "class-validator";
import { LEVELS } from '@constants/levels';

@ApiModel({
    name: "RandomQuestionFilter"
})

export default class RandomQuestionFilter {
    @ApiModelProperty({
        description: "Question category id of question",
        required: true,
    })
    @IsArray()
    @IsNotEmpty()
    public questionCategoriesId: Array<string>

    @ApiModelProperty({
        description: "Level of questions",
        required: true,
        enum: [String(LEVELS.LEVEL_1), String(LEVELS.LEVEL_2), String(LEVELS.LEVEL_3)]
    })
    @IsEnum(LEVELS)
    @IsNotEmpty()
    public level: LEVELS

    @ApiModelProperty({
        description: "Amount of questions",
        required: true,
    })
    @IsNumber()
    @IsNotEmpty()
    public size: number

    constructor(
        questionCategoriesId: Array<string>,
        level: LEVELS,
        size: number
    ) {
        this.questionCategoriesId = questionCategoriesId;
        this.level = level;
        this.size = size;
    }
}
