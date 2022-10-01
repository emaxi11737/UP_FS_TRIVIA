import { ApiModel, ApiModelProperty } from 'swagger-express-ts';
import { IsNotEmpty, IsNumber } from "class-validator";

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
    })
    @IsNumber()
    @IsNotEmpty()
    public level: number;

    public createdAt: Date;
    public updatedAt: Date;

    constructor(
        id: string,
        username: string,
        score: number,
        level: number,
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
