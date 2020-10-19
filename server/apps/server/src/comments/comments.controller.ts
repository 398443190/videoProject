import { Comment } from '@libs/db/models/comment.model';
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { CurrentUser } from '../auth/current-user.decorator';

@Controller('comments')
@ApiTags('评论接口')
export class CommentsController {
    constructor(
        @InjectModel(Comment) private commentModel: ReturnModelType<typeof Comment>
    ) {}


    @Get()
    async index(@Query('query') query: string, @CurrentUser() user) {
        const params = JSON.parse(query)

        return await this.commentModel
        .find()
        .populate('user')
        .where(params.where)
        .setOptions(params)
    }


    @Post()
    @UseGuards(AuthGuard('jwt'))
    async create(@Body() dto, @CurrentUser() user) {
        dto.user = user._id
        await this.commentModel.create(dto)
    }
}
