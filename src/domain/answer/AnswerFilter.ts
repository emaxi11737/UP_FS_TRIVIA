import { ApiModel, ApiModelProperty } from 'swagger-express-ts';
import { IsString, Matches, IsOptional } from "class-validator";

@ApiModel({
    name: "AnswerFilter"
})

export default class AnswerFilter {
    @ApiModelProperty({
        description: "Question id of answer",
        required: false,
    })
    @IsString()
    @IsOptional()
    @Matches(/^[0-9a-fA-F]{24}$/)
    public questionId?: string;

    constructor(
        questionId?: string,
    ) {
        this.questionId = questionId;
    }
}
