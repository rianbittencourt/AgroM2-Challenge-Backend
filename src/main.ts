import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita o CORS para todas as origens
  app.enableCors({
    origin: '*', // Permite todas as origens
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Permite os métodos HTTP
    allowedHeaders: ['Content-Type', 'Authorization'], // Permite esses cabeçalhos
  });

  app.useGlobalPipes(new ValidationPipe());

  // Aqui definimos nossa configuração para criar a documentação no Swagger acessível na /api
  const config = new DocumentBuilder()
    .setTitle('AgroM2 Api - Challenge')
    .setDescription('API Desenvolvida em NEST.JS com base no desafio da AgroM2')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Inicia o servidor na porta 3001
  await app.listen(3001);

  Logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
