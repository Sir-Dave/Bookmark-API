import { Injectable } from '@nestjs/common';
import { PrismaDbService } from 'src/prisma-db/prisma-db.service';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaDbService){}

    async editUser(userId: number, dto: EditUserDto){
        const user = await this.prisma.user.update({
            where: {
                id: userId
            },
            data: {
                ...dto
            }
        })

        delete user.hashPassword
        return user
    }
}
