import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger'; // Importa decorators para a documentação da API
import { AuthService } from './auth.service'; // Importa o serviço que contém a lógica de autenticação
import { LoginDto } from './dto/login.dto'; // Importa o DTO para login
import { RegisterDto } from './dto/register.dto'; // Importa o DTO para registro

@ApiTags('auth') // Define a categoria 'auth' para esta seção na documentação do Swagger
@Controller('auth') // Define o caminho base para todas as rotas dentro deste controller como '/auth'
export class AuthController {
  // Injeção do serviço AuthService que vai gerenciar o login e registro
  constructor(private readonly authService: AuthService) {}

  // Rota para registrar um novo usuário
  @Post('register') 
  async register(@Body() registerDto: RegisterDto) {
    // Chama o método de registro do AuthService e retorna a resposta
    return this.authService.register(registerDto);
  }

  // Rota para realizar o login de um usuário
  @Post('login') 
  @HttpCode(HttpStatus.OK) // Define explicitamente o status HTTP da resposta como OK (200)
  async login(@Body() loginDto: LoginDto) {
    // Chama o método de login do AuthService e retorna a resposta com o token JWT
    return this.authService.login(loginDto);
  }

  // Rota para verificar se as credenciais de login são válidas
  @Post('check-credentials') 
  @HttpCode(HttpStatus.OK) // Define explicitamente o status HTTP da resposta como OK (200)
  async checkCredentials(@Body() loginDto: LoginDto) {
    // Chama o método de validação de credenciais do AuthService e retorna o usuário se for válido
    return this.authService.checkCredentials(loginDto);
  }
}
