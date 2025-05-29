// Importa o framework Express para criar o servidor HTTP
import express from "express";

// Importa o Prisma Client para interagir com o banco de dados
import { PrismaClient } from "@prisma/client";

import cors from "cors"; // Importa o middleware CORS

// Inicializa o aplicativo Express
const app = express();

// Cria uma instância do Prisma Client para realizar operações no banco de dados
const prisma = new PrismaClient();

// Habilita CORS para todas as origens
app.use(cors());

// Configura o Express para interpretar requisições com corpo em JSON
app.use(express.json());

app.use(express.static("public")); // Serve arquivos estáticos da pasta "public"

// Rota POST para criar um novo usuário
app.post("/users", async (req, res) => {
    const { nome, email, senha } = req.body; // Extrai os dados enviados no corpo da requisição
    try {
        const user = await prisma.user.create({
            data: { nome, email, senha }, // Insere os dados no banco de dados
        });
        res.status(201).json(user); // Retorna o usuário criado com status HTTP 201 (Created)
    } catch (error) {
        console.error("Erro ao criar usuário:", error); // Exibe o erro no console
        res.status(500).json({ error: "Erro ao salvar usuário" }); // Retorna uma resposta de erro com status HTTP 500
    }
});

// Rota GET para listar todos os usuários
app.get("/users", async (req, res) => {
    try {
        const users = await prisma.user.findMany(); // Busca todos os registros na tabela "User"
        res.status(200).json(users); // Retorna a lista de usuários com status HTTP 200 (OK)
    } catch (error) {
        console.error("Erro ao buscar usuários:", error); // Exibe o erro no console
        res.status(500).json({ error: "Erro ao buscar usuários" }); // Retorna uma resposta de erro com status HTTP 500
    }
});

// Rota DELETE para deletar todos os usuários
app.delete("/users", async (req, res) => {
    try {
        await prisma.user.deleteMany(); // Deleta todos os registros na tabela "User"
        res.status(200).json({ message: "Todos os usuários foram deletados." }); // Retorna uma mensagem de sucesso
    } catch (error) {
        console.error("Erro ao deletar usuários:", error); // Exibe o erro no console
        res.status(500).json({ error: "Erro ao deletar usuários" }); // Retorna uma resposta de erro com status HTTP 500
    }
});

// Configura o servidor para escutar requisições na porta 3000
app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000"); // Exibe uma mensagem no console indicando que o servidor está rodando
});