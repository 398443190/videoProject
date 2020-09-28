
import { Episode } from '@libs/db/models/episode.model';
import { Controller } from '@nestjs/common';
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
}
