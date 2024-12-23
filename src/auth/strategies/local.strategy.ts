import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';


// A classe LocalStrategy é responsável por definir a estratégia de autenticação (utilizadas no login/registro com email + senha)
// o Passport.js com o NestJS, permitindo usar a estratégia de autenticação local.

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    // Configura o campo 'email' como o campo que será usado para autenticação,
    // em vez do padrão 'username'.
    super({
      usernameField: 'email', // Definimos que o campo "email" será usado como nome de usuário
    });
  }


  // O método 'validate' é chamado automaticamente pelo Passport quando as credenciais
  // são fornecidas (no caso, email e senha). Ele valida essas credenciais.
  async validate(email: string, password: string) {
    // Chama o método 'validateUser' do AuthService para verificar se o email e senha são válidos.
    const user = await this.authService.validateUser(email, password);

    // Se o usuário não for encontrado ou as credenciais forem inválidas, lança uma exceção.
    if (!user) {
      // Lança uma exceção UnauthorizedException, que irá gerar um erro 401 na resposta HTTP.
      throw new UnauthorizedException('Credenciais Invalidas');
    }
    
    // Se as credenciais forem válidas, retorna o objeto 'user' para que o Passport 
    // possa associá-lo à requisição.
    return user;
  }
}