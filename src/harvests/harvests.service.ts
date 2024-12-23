import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Harvest } from './entities/harvest.entity';
import { CreateHarvestDto } from './dto/create-harvest.dto';
import { UpdateHarvestDto } from './dto/update-harvest.dto';
import { User } from '../users/entities/user.entity';

// O serviço é responsável pela lógica de negócios relacionada às operações de Harvest (colheitas).
@Injectable()
export class HarvestsService {
  constructor(
    @InjectRepository(Harvest)
    private harvestsRepository: Repository<Harvest>, // Repositório da entidade Harvest para realizar as operações CRUD.
  ) {}

  // Método para criar uma nova colheita, associando-a a um usuário específico.
  async create(createHarvestDto: CreateHarvestDto, user: User): Promise<Harvest> {
    const harvest = this.harvestsRepository.create({
      ...createHarvestDto,
      user, // Associa o usuário à colheita.
    });

     // Salva a nova colheita no banco de dados e retorna a colheita criada.
    return this.harvestsRepository.save(harvest);
  }

  // Método para buscar todas as colheitas associadas a um usuário.
  async findAll(user: User): Promise<Harvest[]> {
    // Busca todas as colheitas onde o usuário corresponde ao ID fornecido.
    return this.harvestsRepository.find({
      where: { user: { id: user.id } }, 
    });
  }

  // Método para encontrar uma colheita específica pelo ID, associada a um usuário.
  async findOne(id: string, user: User): Promise<Harvest> {
    // Tenta encontrar a colheita com o ID e que pertença ao usuário específico.
    const harvest = await this.harvestsRepository.findOne({
      where: { id, user: { id: user.id } }, 
    });
    
    // Se a colheita não for encontrada, retorna erro
    if (!harvest) {
      throw new NotFoundException(`Não existe uma colheita com o ID especificado.`);
    }

    // Retorna a colheita encontrada.
    return harvest;
  }

 // Método para alterar os dados de uma colheita
  async update(id: string, updateHarvestDto: UpdateHarvestDto, user: User): Promise<Harvest> {
    // Acha a colheita com base no id passado como parametro
    const harvest = await this.findOne(id, user);
    
    // faz as alterações
    Object.assign(harvest, updateHarvestDto);
    
    // Salva e retorna
    return this.harvestsRepository.save(harvest);
  }

  // Método para remover uma colheita pelo ID, associada a um usuário.
  async remove(id: string, user: User): Promise<void> {
    // Tenta deletar a colheita que corresponda ao ID e ao usuário.
    const result = await this.harvestsRepository.delete({
      id,
      user: { id: user.id }, 
    });
    
    // Se nada acontecer ou seja nenhuma colheita for deletada, retorna erro (Usei essa abordagem pra evitar fazer um FindOne para verificar se existe a colheita antes de deletar)
    if (result.affected === 0) {
      throw new NotFoundException(`Harvest with ID ${id} not found`);
    }

    // Se a colheita for deletada, retorna sucesso.
  }
}