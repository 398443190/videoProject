import { User } from "@libs/db/models/user.model";
import { BadRequestException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ReturnModelType } from "@typegoose/typegoose";
import { compareSync } from "bcryptjs";
import { InjectModel } from "nestjs-typegoose";
import { Strategy, IStrategyOptions } from "passport-local";

export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
    constructor(
        @InjectModel(User) private userModel: ReturnModelType<typeof User>
    ) {
        super({
            usernameField: 'username',
            passwordField: 'password'
        } as IStrategyOptions)
    }

    async validate(username: string, password: string) {
        const user = await this.userModel.findOne({ username }).select('+password')
        console.log(user, 'user')
        if (!user) {
            throw new BadRequestException('用户不存在')
        }
        if (!compareSync(password, user.password)) {
            throw new BadRequestException('密码不存在')
        }
        return user
    }
}