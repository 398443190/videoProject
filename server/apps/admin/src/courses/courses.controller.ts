
import { Course } from '@libs/db/models/course.model';
import { Controller } from '@nestjs/common';
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
}
