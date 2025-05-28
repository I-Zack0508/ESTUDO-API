// Importa o framework Express para criar o servidor HTTP
import express from "express";

// Importa o Prisma Client para interagir com o banco de dados
import { PrismaClient } from "@prisma/client";

// Inicializa o aplicativo Express
const app = express();

// Cria uma instância do Prisma Client para realizar operações no banco de dados
const prisma = new PrismaClient();

// Configura o Express para interpretar requisições com corpo em JSON
app.use(express.json());

// Rota para criar um novo usuário
app.post("/users", async (req, res) => {
    // Extrai os dados enviados no corpo da requisição (nome, email e senha)
    const { nome, email, senha } = req.body;

    try {
        // Usa o Prisma Client para criar um novo registro na tabela "User"
        const user = await prisma.user.create({
            data: { nome, email, senha }, // Dados que serão inseridos no banco
        });
        // Retorna o usuário criado com status HTTP 201 (Created)
        res.status(201).json(user);
    } catch (error) {
        // Caso ocorra algum erro, exibe o erro no console
        console.error("Erro ao criar usuário:", error);
        // Retorna uma resposta de erro com status HTTP 500 (Internal Server Error)
        res.status(500).json({ error: "Erro ao salvar usuário" });
    }
});

// Rota para listar todos os usuários
app.get("/users", async (req, res) => {
    try {
        // Usa o Prisma Client para buscar todos os registros na tabela "User"
        const users = await prisma.user.findMany();
        // Retorna a lista de usuários com status HTTP 200 (OK)
        res.status(200).json(users);
    } catch (error) {
        // Caso ocorra algum erro, exibe o erro no console
        console.error("Erro ao buscar usuários:", error);
        // Retorna uma resposta de erro com status HTTP 500 (Internal Server Error)
        res.status(500).json({ error: "Erro ao buscar usuários" });
    }
});

// Configura o servidor para escutar requisições na porta 3000
app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});