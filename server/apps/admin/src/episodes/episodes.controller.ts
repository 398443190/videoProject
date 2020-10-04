
import { Episode } from '@libs/db/models/episode.model';
import { Controller, Get } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Crud } from 'nestjs-mongoose-crud'
import { ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';


@Crud({
    model: Episode
})
@Controller('episodes')
@ApiTags('课时模块')
export class EpisodesController {
    constructor(@InjectModel(Episode) private readonly model: ReturnModelType<typeof Episode>
    ) {}
    @Get('option')
    option (){
        return {
            title: '课时管理',
            // column: [{ label: "ID", prop: '_id' }, { label: "课程名称", prop: 'name' }, { label: "课程封面图", prop: 'cover' }, { label: '创建日期', prop: 'createdAt', format: "yyyy-MM-dd" }],
            column: [{ label: "课时名称", prop: 'name' }]
          }
    }
}
