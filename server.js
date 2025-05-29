// Importa ferramentas para criar o servidor e falar com o banco de dados
import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors"; // Permite que o navegador acesse o servidor

// Cria o servidor e conecta ao banco de dados
const app = express();
const prisma = new PrismaClient();

// Diz ao servidor para aceitar dados em formato JSON
app.use(express.json());

// Diz ao servidor para mostrar arquivos da pasta "public" (como HTML e CSS)
app.use(express.static("public"));

// Permite que o navegador acesse o servidor de qualquer lugar
app.use(cors());

// Quando alguém quiser criar um usuário, o servidor pega os dados e salva no banco
app.post("/users", async (req, res) => {
    const { nome, email, senha } = req.body;
    try {
        const user = await prisma.user.create({ data: { nome, email, senha } });
        res.status(201).json(user); // Diz que deu certo e mostra o usuário criado
    } catch (error) {
        console.error("Erro ao criar usuário:", error);
        res.status(500).json({ error: "Erro ao salvar usuário" }); // Diz que algo deu errado
    }
});

// Quando alguém quiser ver todos os usuários, o servidor pega do banco e mostra
app.get("/users", async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users); // Diz que deu certo e mostra os usuários
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        res.status(500).json({ error: "Erro ao buscar usuários" }); // Diz que algo deu errado
    }
});

// Quando alguém quiser apagar todos os usuários, o servidor apaga do banco
app.delete("/users", async (req, res) => {
    try {
        await prisma.user.deleteMany();
        res.status(200).json({ message: "Todos os usuários foram deletados." }); // Diz que deu certo
    } catch (error) {
        console.error("Erro ao deletar usuários:", error);
        res.status(500).json({ error: "Erro ao deletar usuários" }); // Diz que algo deu errado
    }
});

// Diz ao servidor para ficar escutando na porta 3000
app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000"); // Mostra que o servidor está funcionando
});