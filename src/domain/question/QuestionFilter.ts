import { ApiModel, ApiModelProperty } from 'swagger-express-ts';
import { IsString, Matches, IsOptional } from "class-validator";

@ApiModel({
    name: "QuestionFilter"
})

export default class QuestionFilter {
    @ApiModelProperty({
        description: "Question id of answer",
        required: false,
    })
    @IsString()
    @IsOptional()
    @Matches(/^[0-9a-fA-F]{24}$/)
    public questionCategoryId?: string;

    constructor(
        questionCategoryId?: string,
    ) {
        this.questionCategoryId = questionCategoryId;
    }
}
