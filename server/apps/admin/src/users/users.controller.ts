import { User } from '@libs/db/models/user.model';
import { Controller, Get } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Crud } from 'nestjs-mongoose-crud'
import { ApiTags } from '@nestjs/swagger';


@Crud({
    model: User
})
@Controller('users')
@ApiTags('用户模块')
export class UsersController {
    constructor(@InjectModel(User) private readonly model) {}
    @Get('option')
    option (){
        return {
            title: '用户管理',
            // column: [{ label: "ID", prop: '_id' }, { label: "课程名称", prop: 'name' }, { label: "课程封面图", prop: 'cover' }, { label: '创建日期', prop: 'createdAt', format: "yyyy-MM-dd" }],
            column: [{ label: "用户名称", prop: 'username' }]
          }
    }
}
