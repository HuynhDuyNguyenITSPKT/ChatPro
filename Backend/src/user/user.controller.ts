import { Controller, Get, InternalServerErrorException, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../user/user.schema";
import { Model } from "mongoose";

@Controller("users")
export class UserController {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    @Get("profile")
    @UseGuards(JwtAuthGuard)
    async getMe(@Req() req: any) {
        const iduser = req.user.sub;
        try {
            const user = await this.userModel.findById(iduser);
            return user;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }


}
