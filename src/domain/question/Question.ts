import { ApiModel, ApiModelProperty } from 'swagger-express-ts';
import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { LEVELS } from '@constants/levels';

@ApiModel({
    name: "Question"
})

export default class Question {
    @ApiModelProperty({
        description: "Id of Question ",
        required: false,
    })
    public id: string;

    @ApiModelProperty({
        description: "Name of Question ",
        required: true,
    })
    @IsString()
    public name: string;

    @ApiModelProperty({
        description: "Description of Question ",
        required: true,
    })
    @IsString()
    public description: string;

    @ApiModelProperty({
        description: "Id of QuestionCategory ",
        required: true,
    })
    @IsString()
    public questionCategoryId: string;

    @ApiModelProperty({
        description: "Level of game",
        required: true,
        enum: [String(LEVELS.LEVEL_1), String(LEVELS.LEVEL_2), String(LEVELS.LEVEL_3)]
    })
    @IsEnum(LEVELS)
    @IsNotEmpty()
    public level: LEVELS;

    public createdAt: Date;
    public updatedAt: Date;
    public deletedAt?: Date | null;

    constructor(
        id: string,
        name: string,
        description: string,
        questionCategoryId: string,
        level: LEVELS,
        createdAt: Date,
        updatedAt: Date,
        deletedAt?: Date | null
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.questionCategoryId = questionCategoryId;
        this.level = level;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }
}
