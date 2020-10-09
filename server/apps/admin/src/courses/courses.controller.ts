
import { Course } from '@libs/db/models/course.model';
import { Controller, Get } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Crud } from 'nestjs-mongoose-crud'
import { ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';


@Crud({
    model: Course
})
@Controller('courses')
@ApiTags('课程模块')
export class CoursesController {
    constructor(@InjectModel(Course) private readonly model: ReturnModelType<typeof Course>
    ) {}
    @Get('option')
    option (){
        return {
            title: '表格的标题',
            index: true,
            indexLabel:'序号',
            // column: [{ label: "ID", prop: '_id' }, { label: "课程名称", prop: 'name' }, { label: "课程封面图", prop: 'cover' }, { label: '创建日期', prop: 'createdAt', format: "yyyy-MM-dd" }],
            column: [{ label: "课程名称", prop: 'name', sortable: true, search: true, regex: true, row: true }, { label: "课程封面图", prop: 'cover',type: 'upload', listType: 'picture-img', action: '/upload' }]
          }
    }
}
