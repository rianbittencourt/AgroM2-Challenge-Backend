// Aqui definidos o Guard do Auth para projeger as Rotas com JWT obrigatorio
// Alguns pontos de melhoria seria adicionar alguma logica e tratamento de erros.

import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}