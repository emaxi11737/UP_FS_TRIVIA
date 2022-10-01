import { ApiModel, ApiModelProperty } from 'swagger-express-ts';
import { IsArray } from "class-validator";

@ApiModel({
    name: "RandomQuestionFilter"
})

export default class RandomQuestionFilter {
    @ApiModelProperty({
        description: "Question category id of question",
        required: false,
    })
    @IsArray()
    public questionCategoriesId: Array<string>

    constructor(
        questionCategoriesId: Array<string>
    ) {
        this.questionCategoriesId = questionCategoriesId;
    }
}
