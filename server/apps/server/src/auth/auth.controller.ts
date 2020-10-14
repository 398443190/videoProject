import { User } from '@libs/db/models/user.model';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'
import { JwtService } from '@nestjs/jwt';
import { CurrentUser} from './current-user.decorator'



@ApiTags('用户')
@Controller('auth')
export class AuthController {
    constructor(
        private jwtService: JwtService,
        @InjectModel(User) private userModel: ReturnModelType<typeof User>
    ){}
    @Post('resister')
    @ApiOperation({summary: '注册'})
    async resister(@Body() dto: RegisterDto) {
        const {username, password} = dto
        const user = await this.userModel.create({
            username,
            password
        })
        return {
            user
        }
    }

    @Post('login')
    @ApiOperation({summary: '登录'})
    @UseGuards(AuthGuard('local'))
    async login(@Body() dto: LoginDto, @CurrentUser() user) {
        return {
            token: this.jwtService.sign(String(user._id))
        }
    }

    @Get('user')
    @ApiOperation({summary: '获取个人信息'})
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async user(@CurrentUser() user) {
        return user
    }
}
