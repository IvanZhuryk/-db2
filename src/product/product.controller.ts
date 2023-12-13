import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { Public } from 'common/decorators';
import { ProductService } from './product.service';
import { ProductDto } from './dto';



@Public()
@Controller('product')
export class ProductController {
    constructor(private readonly productService:ProductService) {
    }
    @Get(':type')
    async getManyOfOneType(@Param('type') type:string) {
        return await this.productService.findByType(type);
    }
    @Post()
    async createProduct(@Body() dto:ProductDto) {
        const product = await this.productService.create(dto);
        return product;
    }
    @Delete(':id')
    deletProduct(@Param("id", ParseUUIDPipe) id:string) {
        return this.productService.delete(id)
    }
}