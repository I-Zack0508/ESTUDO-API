------------------------------------------------------------------
--PASSO A PASSO PARA CONFIGURAR O PRISMA CLIENT
------------------------------------------------------------------

1. **Instalar o Prisma**
   Execute os seguintes comandos no terminal para instalar o Prisma e inicializar o projeto:

   < npm install prisma @prisma/client >
   < npx prisma init > 

   Isso gerará dois arquivos importantes:
- Um arquivo chamado `.env` para configurar a conexão com o banco de dados.
- Uma pasta chamada `prisma` contendo o arquivo `schema.prisma`, onde você define o modelo do banco de dados.

------------------------------------------------------------------

2. **Configurar o arquivo `.env`**
No arquivo `.env`, configure a URL de conexão com o banco de dados MySQL. 
Exemplo: DATABASE_URL="mysql://root:aluno@localhost:3306/users-api-test"

- `root`: Usuário do MySQL.
- `aluno`: Senha do usuário.
- `localhost`: Host do banco de dados (local).
- `3306`: Porta padrão do MySQL.
- `users-api-test`: Nome do banco de dados.

------------------------------------------------------------------

3. **Configurar o arquivo `schema.prisma`**
No arquivo `schema.prisma`, defina o modelo do banco de dados e configure o Prisma Client. Exemplo:

generator client { 
    provider = "prisma-client-js" 
}

datasource db {
     provider = "mysql" 
     url = env("DATABASE_URL") 
}

model user {
  id    Int    @id @default(autoincrement())
  nome  String
  email String
  senha String
}

- `generator client`: Configura o Prisma Client para ser usado no código.
- `datasource db`: Define o banco de dados como MySQL e utiliza a URL do `.env`.
- `model user`: Define a tabela `User` com as colunas `id`, `nome`, `email` e `senha`.

------------------------------------------------------------------

4. **Criar o banco de dados no MySQL**
Acesse o MySQL e crie o banco de dados especificado no `.env`. Exemplo:
< CREATE DATABASE users-api-test; >

------------------------------------------------------------------

5. **Aplicar as migrações**
Após configurar o `schema.prisma`, execute o seguinte comando para criar as tabelas no banco de dados:

< npx prisma migrate dev --name init >

Isso criará a tabela `User` no banco de dados e salvará a migração na pasta `prisma/migrations`.

------------------------------------------------------------------

6. **Gerar o Prisma Client**
Para gerar o Prisma Client, execute:

< npx prisma generate >

Isso criará o Prisma Client na pasta `node_modules/@prisma/client`, permitindo que você o utilize no código.

------------------------------------------------------------------

7. **Usar o Prisma Client no código**
No seu código, importe o Prisma Client e use-o para interagir com o banco de dados. Exemplo:

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

------------------------------------------------------------------

8. **Testar o backend**
Use ferramentas como Postman ou Thunder Client para testar as rotas do backend e verificar se os dados estão sendo inseridos e recuperados corretamente.

------------------------------------------------------------------