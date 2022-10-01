import { ApiModel, ApiModelProperty } from 'swagger-express-ts';
import { IsString, Matches, IsOptional, IsEnum } from "class-validator";
import { LEVELS } from '@constants/levels';

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

    @ApiModelProperty({
        description: "Level of game",
        required: false,
        enum: [String(LEVELS.LEVEL_1), String(LEVELS.LEVEL_2), String(LEVELS.LEVEL_3)]
    })
    @IsEnum(LEVELS)
    @IsOptional()
    public level: LEVELS;

    constructor(
        id: string,
        name?: string,
        description?: string,
        questionCategoryId?: string,
        level?: LEVELS
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.questionCategoryId = questionCategoryId;
        this.level = level;
    }
}
