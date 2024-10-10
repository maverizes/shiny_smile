import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User, UserRoles } from './model/user.model';
import { CreateUserRequest, UploadUserImageRequest } from './interfaces';
import { UploadFileResponse, UploadService } from '../upload';
import { Order } from '../order/model/order.model';
import { Review } from '../reviews/model/review.model';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User) private userModel: typeof User,
        private uploadService: UploadService,
    ) { }

    async getAllUsers(): Promise<User[]> {
        const data = await this.userModel.findAll({
            include: [Order, Review],
        });
        return data;
    }
    async findbyPhone(phone: string): Promise<User> {
        const foundCustomer = await this.userModel.findOne({ where: { phone } });
        if (!foundCustomer) {
            throw new NotFoundException(`Customer with phone ${phone} not found`);
        }
        return foundCustomer;
    }

    async createUser(payload: CreateUserRequest): Promise<void> {
        let imageUrl: null | UploadFileResponse = null;

        if (payload?.image) {
            imageUrl = await this.uploadService.uploadFile({
                destination: 'uploads',
                file: payload.image,
            });
        }

        await this.userModel.create({
            name: payload.name,
            phone: payload.phone,
            email: payload.email,
            image: imageUrl ? imageUrl?.imageUrl : '',
            role: payload?.role ? payload.role : UserRoles.user
        });
    }

    async uploadUserImage(payload: UploadUserImageRequest): Promise<void> {
        // CHECK IF USER EXISTS
        await this.#_checkUser(payload.userId);

        const foundedUser = await this.userModel.findByPk(payload.userId);

        let imageUrl: null | UploadFileResponse = null;

        imageUrl = await this.uploadService.uploadFile({
            destination: 'uploads',
            file: payload.image,
        });

        await this.userModel.update(
            { image: imageUrl ? imageUrl?.imageUrl : '' },
            { where: { id: payload.userId } },
        );
    }

    async deleteUser(userId: number): Promise<void> {
        const foundedUser = await this.userModel.findByPk(userId);

        if (foundedUser?.image) {
            await this.uploadService.removeFile({ fileName: foundedUser.image });
        }

        await this.userModel.destroy({ where: { id: userId } });
    }

    async #_checkUser(userId: number): Promise<void> {
        const user = await this.userModel.findByPk(userId);

        if (!user) {
            throw new Error('User not found');
        }
    }
}