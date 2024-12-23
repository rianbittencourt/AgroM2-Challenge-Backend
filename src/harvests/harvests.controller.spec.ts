//Testes unitários para o controller HARVEST

import { Test, TestingModule } from '@nestjs/testing';
import { HarvestsController } from './harvests.controller';
import { HarvestsService } from './harvests.service';
import { CreateHarvestDto } from './dto/create-harvest.dto';
import { User } from '../users/entities/user.entity';



describe('HarvestsController', () => {
  let controller: HarvestsController;
  let service: HarvestsService;

  // Mock de um usuário para simular a criação de uma colheita associada a um usuário específico.

  const mockUser: User = {
    id: '1',
    email: 'test@example.com',
    password: 'password',
    name: 'Test User',
    harvests: [],
  };

  // Mock do serviço HarvestsService, com funções 'create' e 'findAll' substituídas por mocks
  const mockHarvestsService = {
    create: jest.fn(),
    findAll: jest.fn(),
  };

  // Configura o módulo de testes antes de cada teste
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HarvestsController],
      providers: [
        {
          provide: HarvestsService,
          useValue: mockHarvestsService,
        },
      ],
    }).compile();

    // Inicializa as instâncias do controller e serviço a partir do módulo de testes
    controller = module.get<HarvestsController>(HarvestsController);
    service = module.get<HarvestsService>(HarvestsService);
  });

  // Teste para verificar se a criação de uma nova colheita funciona corretamente
  it('should create a harvest', async () => {
    // DTO de entrada para criar uma nova colheita
    const dto: CreateHarvestDto = {
      date: new Date(),
      location: 'Test Location',
      quantity: 100,
      seedType: 'Test Seed',
      fertilizer: 'Test Fertilizer',
    };

    // Mock da função create do serviço, fazendo-a retornar a colheita criada com um ID
    mockHarvestsService.create.mockResolvedValue({ ...dto, id: '1', user: mockUser });

    // Chama o método create do controller, passando o DTO e o mock de usuário
    const result = await controller.create(dto, mockUser);

    // Verifica se o resultado tem a propriedade 'id', o que indica que a colheita foi criada
    expect(result).toHaveProperty('id');

    // Verifica se o método 'create' do serviço foi chamado com o DTO e o usuário
    expect(service.create).toHaveBeenCalledWith(dto, mockUser);
  });
});