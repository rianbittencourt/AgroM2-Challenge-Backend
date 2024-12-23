
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { HarvestsModule } from './harvests/harvests.module';


// Aqui definimos todos os nossos modulos que serão usados na aplicação
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],

      // Neste caso, estamos configurando o TypeORM para usar o banco de dados PostgreSQL,
      // com a URL da base de dados vindo da variável de ambiente 'DATABASE_URL'.
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        autoLoadEntities: true,
        synchronize: false, // Desativei para testar em produção porem em desenvolvimento pode ativar
      }),

      // Injeta o ConfigService para acessar as configurações da aplicação
      inject: [ConfigService],
    }),

    // Importa os módulos de autenticação, usuários e colheitas para integrá-los ao AppModule
    AuthModule,
    AuthModule,
    UsersModule,
    HarvestsModule,
  ],
})

// Define o módulo principal da aplicação onde usamos no main.ts
export class AppModule {}