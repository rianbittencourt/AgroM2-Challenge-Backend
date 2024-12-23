import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';

// A classe JwtStrategy é responsável por validar o token JWT no cabeçalho de autenticação
// e associá-lo a um usuário no sistema. Ela herda de PassportStrategy, utilizando a estratégia JWT.
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
  ) {
    super({
      // Define de onde o token JWT será extraído da requisição
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // Define se a expiração do token será ignorada ou não (não deve ser ignorada)
      ignoreExpiration: false,
      // Define a chave secreta para validar o token JWT (.env)
      secretOrKey: configService.get('JWT_SECRET', 'default-secret-key'),
    });
  }


  // Método de validação que será executado quando um token JWT for fornecido
  async validate(payload: any) {
    // Busca o usuário no banco de dados usando o 'sub' do payload (que é o ID do usuário)
    const user = await this.usersService.findById(payload.sub);
    // Se o usuário não for encontrado, ele será automaticamente rejeitado
    // Retorna o usuário se encontrado (caso contrário, o Passport rejeita a requisição)
    return user;
  }
}