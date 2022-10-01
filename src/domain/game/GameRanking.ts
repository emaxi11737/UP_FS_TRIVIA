import { ApiModel, ApiModelProperty } from 'swagger-express-ts';
import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";
import { LEVELS } from '@constants/levels';

@ApiModel({
    name: "GameRanking"
})

export default class GameRanking {
    @ApiModelProperty({
        description: "Id of game",
        required: false,
    })
    public id: string;

    @ApiModelProperty({
        description: "Username of game",
        required: false,
    })
    public username: string;

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
        username: string,
        score: number,
        level: LEVELS,
        createdAt: Date,
        updatedAt: Date,
    ) {
        this.id = id;
        this.username = username;
        this.score = score;
        this.level = level;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
