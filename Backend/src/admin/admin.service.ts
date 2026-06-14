import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/user/user.schema";


@Injectable()
export class AdminService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) { }

    async getUsers() {
        return this.userModel.find().select('-password');
    }
}
