import { ConflictException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto';
import { UserService } from 'src/user/user.service';
import { Tokens } from './interfaces';
import { compareSync } from 'bcrypt';
import { Token, User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 } from 'uuid';
import { add } from 'date-fns';


@Injectable()
export class AuthService {
    
    private readonly logger = new Logger(AuthService.name)
    constructor(private readonly userService:UserService,
                private readonly jwtService:JwtService,
                private readonly prismaService:PrismaService
                ){}
    async refreshTokens(refreshToken: string): Promise<Tokens> {
        const token = await this.prismaService.token.findUnique({where:{token:refreshToken}});
        if(!token) {
            throw new UnauthorizedException()
        }
        await this.prismaService.token.delete({where:{token:refreshToken}})
        if(new Date(token.exp)< new Date()){
            throw new UnauthorizedException()
        }
        const user = await this.userService.findOne(token.userId);
        return this.generateTokens(user)

    }
    async register(dto:LoginDto) {
        const user :User = await this.userService.findOne(dto.email).catch((err)=>{
            this.logger.error(err);
            return null;
        });
        if(user){
            throw new ConflictException('Користувач з таким email вже існує')
        }
        return this.userService.createUser(dto)
    }
    async login(dto:LoginDto):Promise<Tokens> {
        const user :User = await this.userService.findOne(dto.email).catch((err)=>{
            this.logger.error(err)
            return null
        });
        if(!user || !compareSync(dto.password, user.password)){
            throw new UnauthorizedException('Не правильний логін або пароль');
        }
        return this.generateTokens(user)
    }
    private async generateTokens(user:User):Promise<Tokens>{
        const accessToken =  'Bearer ' + this.jwtService.sign({
            id:user.id,
            email:user.email,
            roles:user.roles,
        });
        const refreshToken = await this.getRefreshTiken(user.id);
        return {accessToken, refreshToken}
    }
    private async getRefreshTiken(userId: string): Promise<Token> {
        return this.prismaService.token.create({
            data:{
                token: v4(),
                exp: add(new Date, {months:1}),
                userId
            }
        })
    }
}
