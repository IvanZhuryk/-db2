import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { Public } from 'common/decorators';


@Public()
@Controller('product')
export class ProductController {
    constructor() {
    }
    @Get()
    getHello(): string {
        return 'Hello World!';
    }
}