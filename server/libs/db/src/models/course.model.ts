import { ApiProperty } from '@nestjs/swagger'
import { modelOptions, prop } from '@typegoose/typegoose'

@modelOptions({
    schemaOptions: {
        timestamps: true,
        toJSON: {virtuals: true}
    }
})
export class Course {
    @ApiProperty({description: '课程名称'})
    @prop()
    name: string

    @ApiProperty({description: '封面图'})
    @prop()
    cover: string


    @prop({
        ref: 'Episode',
        localField: '_id',
        foreignField: 'course'
    })
    public episodes: [string]
}