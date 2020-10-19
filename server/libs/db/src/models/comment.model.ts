import { ApiProperty } from '@nestjs/swagger'
import { modelOptions, prop, Ref } from '@typegoose/typegoose'
import { Course } from './course.model'
import { Episode } from './episode.model'
import { User } from './user.model'

@modelOptions({
    schemaOptions: {
        timestamps: true
    }
})
export class Comment {
    @ApiProperty({ description: '谁做了什么操作？' })
    @prop({ ref: "User" })
    user: Ref<User>

    @ApiProperty({ description: '评论类型' })
    @prop({ enum: ['Course', 'Episode'] })
    type: string

    @ApiProperty({ description: '评论类型的id' })
    @prop({ refPath: 'type' })
    object: Ref<Course | Episode>

    @ApiProperty({ description: '评论内容' })
    @prop()
    content: string
}