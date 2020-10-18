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
export class Action {
    @ApiProperty({ description: '谁做了什么操作？' })
    @prop({ ref: "User" })
    user: Ref<User>

    @ApiProperty({ description: '对谁做了操作' })
    @prop({ enum: ['Course', 'Episode'] })
    type: string

    @prop({ refPath: 'type' })
    object: Ref<Course | Episode>

    @ApiProperty({ description: '操作的名称？ 收藏 点赞' })
    @prop({ enum: ["LIKE", "UPVOKE"] })
    name: string
}