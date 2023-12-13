import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { UserService } from './user.service';


@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService) {
    }
    @Post()
    createUser(@Body() dto){
        return this.userService.createUser(dto)
    }
    @Get(':idOrEmail')
    async findOneUser(@Param('idOrEmail') idOrEmail:string) {
        const user = await this.userService.findOne(idOrEmail);
        return user;
    }
    @Delete(':id')
    deletUser(@Param("id", ParseUUIDPipe) id:string) {
        return this.userService.delete(id)
    }
}
