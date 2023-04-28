import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';
import { PrismaDbService } from 'src/prisma-db/prisma-db.service';

@Injectable()
export class BookmarkService {
    constructor(private prismaService: PrismaDbService) { }

    async createBookmark(userId: number, dto: CreateBookmarkDto) {
        const bookmark =  await this.prismaService.bookmark.create({
             data: {
                 ...dto,
                 userId
             }
         })
         return bookmark
    }

    async getBookmarks(userId: number) {
        const bookmarks = await this.prismaService.bookmark.findMany({
            where: {
                userId
            }
        })
        return bookmarks
    }

    async getBookmarkById(userId: number, bookmarkId: number) {
        const bookmark = await this.prismaService.bookmark.findFirst({
            where: {
                id: bookmarkId,
                userId
            }
        })
        return bookmark

    }

    async editBookmark(userId: number, bookmarkId: number, dto: EditBookmarkDto) {
        const bookmark = await this.prismaService.bookmark.findUnique({
            where: {
                id: bookmarkId,
            }
        })

        if (!bookmark || bookmark.userId !== userId)
            throw new ForbiddenException('Access to resources denied')

        return this.prismaService.bookmark.update({
            where: {
                id: bookmarkId,
            },
            data: {
                ...dto
            }
        });
    }

    async deleteBookmark(userId: number, bookmarkId: number) {
        const bookmark =
            await this.prismaService.bookmark.findUnique({
                where: {
                    id: bookmarkId,
                },
            })

        if (!bookmark || bookmark.userId !== userId)
            throw new ForbiddenException('Access to resources denied')

        await this.prismaService.bookmark.delete({
            where: {
                id: bookmarkId,
            },
        })
    }
}
