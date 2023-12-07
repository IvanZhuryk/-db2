import { ExecutionContext, SetMetadata } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

export const PUBLIK_KEY = 'public';
export const Public = () => SetMetadata(PUBLIK_KEY,true);
export const isPublic = (ctx:ExecutionContext, reflector: Reflector) => {
    const isPublic = reflector.getAllAndOverride<boolean>(PUBLIK_KEY,[ctx.getHandler(), ctx.getClass()])
    return isPublic;
};