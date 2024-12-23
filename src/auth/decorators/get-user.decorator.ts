// Um decorator personalizado para extrair o usuário autenticado da requisição HTTP.
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Este decorator simplifica o acesso aos dados do usuário autenticado,
 * geralmente armazenados no objeto `request.user` por um guard de autenticação,
 * como o `JwtAuthGuard` ao utilizar JWT.
 */

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    // Obtém o objeto de requisição HTTP do contexto.
    const request = ctx.switchToHttp().getRequest();
     // Retorna o objeto 'user' presente na requisição.
    return request.user;
  },
);