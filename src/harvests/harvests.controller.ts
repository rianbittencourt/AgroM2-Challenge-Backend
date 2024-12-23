import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { HarvestsService } from './harvests.service';
import { CreateHarvestDto } from './dto/create-harvest.dto';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../users/entities/user.entity';

@ApiTags('harvests') // Define a categoria 'harvests' para esta seção na documentação do Swagger
@ApiBearerAuth() // Marca que as rotas requerem autenticação via Bearer Token (JWT)
@UseGuards(JwtAuthGuard) // Garante que as Rotas necessitem de um JWT Válido.
@Controller('harvests') // Define o caminho base para as rotas 
export class HarvestsController {
  // Injeta o serviço HarvestsService para acessar a lógica de negócios relacionada às colheitas
  constructor(private readonly harvestsService: HarvestsService) {}

  // Rota para criar uma nova colheita
  @Post()
  create(@Body() createHarvestDto: CreateHarvestDto, @GetUser() user: User) {
    // Chama o serviço para criar a colheita, passando o DTO e o usuário autenticado
    return this.harvestsService.create(createHarvestDto, user);
  }

  // Rota para listar todas as colheitas de um usuário
  @Get()
  findAll(@GetUser() user: User) {
    // Chama o serviço para recuperar todas as colheitas do usuário
    return this.harvestsService.findAll(user);
  }

  // Rota para encontrar uma colheita específica pelo ID
  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() user: User) {
    // Chama o serviço para recuperar a colheita pelo ID, associada ao usuário autenticado
    return this.harvestsService.findOne(id, user);
  }

  // Rota para remover uma colheita pelo ID
  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: User) {
    // Chama o serviço para remover a colheita pelo ID, associada ao usuário autenticado
    return this.harvestsService.remove(id, user);
  }
}
