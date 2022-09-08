import { ApiModel, ApiModelProperty } from 'swagger-express-ts';
import { IsString, IsNotEmpty, IsNumber, Matches } from "class-validator";

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
    })
    @IsNumber()
    @IsNotEmpty()
    public level: number;

    public createdAt: Date;
    public updatedAt: Date;

    constructor(
        id: string,
        userId: string,
        score: number,
        level: number,
        createdAt: Date,
        updatedAt: Date,
    ) {
        this.id = id;
        this.userId = userId;
        this.score = score || 0;
        this.level = level || 0;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
