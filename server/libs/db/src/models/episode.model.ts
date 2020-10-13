import { ApiProperty } from '@nestjs/swagger'
import { modelOptions, prop, Ref } from '@typegoose/typegoose'
import { Course } from './course.model'

@modelOptions({
    schemaOptions: {
        timestamps: true
    }
})
export class Episode {
    @ApiProperty({description: '课时名称'})
    @prop()
    name: string

    @ApiProperty({description: '视频'})
    @prop()
    file: string

    @ApiProperty({description: '所属课程'})
    @prop({ref: () => 'Course'})
    public course: string
}