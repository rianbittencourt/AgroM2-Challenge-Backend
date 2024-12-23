import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

// O serviço é responsável pela lógica de negócios relacionada às operações de autenticação (login/registro).
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // Método para registrar um novo usuário.
  async register(registerDto: RegisterDto) {
    // Verifica se já existe um usuário com o mesmo e-mail.
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    
    // Se o usuário já existir, lança uma exceção de conflito (409) informando o erro.
    if (existingUser) {
      throw new ConflictException({
        message: 'Já existe um usuário cadastrado com este e-mail.',
      });
    }

    // Gera um hash seguro para a senha do usuário utilizando bcrypt.
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // Cria o novo usuário no banco de dados com a senha criptografada.
    const user = await this.usersService.create({
      ...registerDto,
      password: hashedPassword,
    });

    // Remove a senha do objeto de retorno para não expô-la.
    const { password, ...result } = user;
    return result; // Retorna os dados do usuário, sem a senha.
  }

  // Método para autenticar um usuário e gerar um token JWT.
  async login(loginDto: LoginDto) {
    // Valida as credenciais do usuário (e-mail e senha).
    const user = await this.validateUser(loginDto.email, loginDto.password);
    
    // Se as credenciais forem inválidas, lança uma exceção de não autorizado (401).
    if (!user) {
      throw new UnauthorizedException('Credenciais Invalidas');
    }

    // Cria o payload do token JWT com o e-mail e ID do usuário.
    const payload = { email: user.email, sub: user.id };

    // Retorna o usuário e o token JWT gerado.
    return {
      user,
      access_token: this.jwtService.sign(payload), // Gera o token JWT.
    };
  }

  // Método para verificar se as credenciais de login são válidas.
  async checkCredentials(loginDto: LoginDto) {
    // Valida as credenciais do usuário.
    const user = await this.validateUser(loginDto.email, loginDto.password);
    
    // Se as credenciais forem inválidas, lança uma exceção de não autorizado (401).
    if (!user) {
      throw new UnauthorizedException('Credenciais Invalidas');
    }

    // Retorna o usuário se as credenciais forem válidas.
    return user;
  }

  // Método para validar um usuário com base no e-mail e senha fornecidos.
  // Esse método é usado tanto para login quanto para a verificação de credenciais.
  async validateUser(email: string, password: string) {
    // Busca o usuário no banco de dados pelo e-mail.
    const user = await this.usersService.findByEmail(email);

    // Verifica se a senha fornecida é válida (comparando com a senha armazenada no banco de dados).
    if (user && await bcrypt.compare(password, user.password)) {
      // Se a senha for válida, remove a senha do usuário antes de retorná-lo.
      const { password, ...result } = user;
      return result; // Retorna o usuário sem a senha.
    }
    
    // Se o usuário não for encontrado ou a senha for inválida, retorna null.
    return null;
  }
}
