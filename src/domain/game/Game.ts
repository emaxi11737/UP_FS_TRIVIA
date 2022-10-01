import { ApiModel, ApiModelProperty } from 'swagger-express-ts';
import { IsString, IsNotEmpty, IsNumber, Matches, IsEnum } from "class-validator";
import { LEVELS } from '@constants/levels';

@ApiModel({
    name: "Game"
})

export default class Game {
    @ApiModelProperty({
        description: "Id of game",
        required: false,
    })
    public id: string;

    @ApiModelProperty({
        description: "User id of game",
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    @Matches(/^[0-9a-fA-F]{24}$/)
    public userId: string;

    @ApiModelProperty({
        description: "Score of game",
        required: false,
    })
    @IsNumber()
    @IsNotEmpty()
    public score: number;

    @ApiModelProperty({
        description: "Level of game",
        required: false,
        enum: [String(LEVELS.LEVEL_1), String(LEVELS.LEVEL_2), String(LEVELS.LEVEL_3)]
    })
    @IsEnum(LEVELS)
    @IsNotEmpty()
    public level: LEVELS;

    public createdAt: Date;
    public updatedAt: Date;

    constructor(
        id: string,
        userId: string,
        score: number,
        level: LEVELS,
        createdAt: Date,
        updatedAt: Date,
    ) {
        this.id = id;
        this.userId = userId;
        this.score = score || 0;
        this.level = level || LEVELS.LEVEL_1;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
