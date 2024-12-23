
# AGROM2 DESAFIO NEST.JS

Escolhi o Nest.js para construir essa API REST, mesmo sabendo que seria possível fazer tudo no Next.js, porque queria separar o deploy de ambos e aproveitar a oportunidade para treinar um pouco mais de Arquitetura Modular.
## Tecnologias

- NestJS - Framework de backend
- Passport - Middleware de autenticação
- JWT - JSON Web Token para autenticação
- TypeScript - Linguagem utilizada no projeto
- PostgreSQL - Banco de dados relacional, utilizando Supabase como serviço para gerenciamento do banco de dados.
- Railway - Plataforma de deploy e gerenciamento de infraestrutura.
- Jest - Framework de testes.








## Funcionalidades

- Registro de usuários
- Login de usuários
- Validação de credenciais
- Middleware para proteção de rotas utilizando JWT
- CRUD -> Colheita


## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`JWT_SECRET`

`DATABASE_URL`


## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/rianbittencourt/AgroM2-Challenge-Backend
```

Entre no diretório do projeto

```bash
  cd my-project
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run start
```


## Documentação da API

## 🔗 SWAGGER
https://back-end-agrom2-test-production.up.railway.app/api
