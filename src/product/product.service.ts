import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductDto } from './dto';


@Injectable()
export class ProductService {
    constructor(private readonly prismaService:PrismaService) {

    }
    async findByType(type:string){
        return await this.prismaService.product.findFirst({where:{tipe:type}})
    }
    create(dto:ProductDto){
        return this.prismaService.product.create({
            data:{
                title:dto.title,
                price:dto.price,
                weight:dto.weight,
                image:dto.image,
                tipe:dto.tipe
            }
        })
    }
    delete(id: string){
        return this.prismaService.product.delete({
            where:{id}
        })
    }
}