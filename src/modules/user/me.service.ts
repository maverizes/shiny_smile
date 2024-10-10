import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User, Order, Review } from "@modules";

@Injectable()
export class MeService {
    constructor(@InjectModel(User) private userModel: typeof User) {}

    async getMe(userId: number) : Promise<User> {
        return await this.userModel.findByPk(userId, {include: [Order, Review]})
    }     
}