const API_URL = 'http://localhost:3000/users';

// Envia uma requisição POST para criar um novo usuário
document.getElementById("userForm").addEventListener("submit", async (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário

    const nome = document.getElementById("nome").value; // Obtém o valor do campo "nome"
    const email = document.getElementById("email").value; // Obtém o valor do campo "email"
    const senha = document.getElementById("senha").value; // Obtém o valor do campo "senha"

    try {
        const response = await fetch(API_URL, {
            method: "POST", // Define o método HTTP como POST
            headers: {
                "Content-Type": "application/json", // Define o tipo de conteúdo como JSON
            },
            body: JSON.stringify({ nome, email, senha }), // Envia os dados do formulário no corpo da requisição
        });

        if (response.ok) {
            const user = await response.json(); // Obtém o usuário criado na resposta
            alert("Usuário cadastrado com sucesso!"); // Exibe uma mensagem de sucesso
            document.getElementById("userForm").reset(); // Limpa o formulário
            fetchUsers(); // Atualiza a lista de usuários
        } else {
            const errorMessage = await response.text(); // Obtém a mensagem de erro do servidor
            alert("Erro ao cadastrar usuário: " + errorMessage); // Exibe a mensagem de erro
        }
    } catch (error) {
        console.error("Erro", error); // Exibe o erro no console
        alert("CATCH Erro ao cadastrar usuário: " + error.message); // Exibe uma mensagem de erro de conexão
    }
});

// Função para buscar e exibir todos os usuários
async function fetchUsers() {
    try {
        const response = await fetch(API_URL); // Envia uma requisição GET para buscar os usuários
        const users = await response.json(); // Converte a resposta em JSON

        const userList = document.getElementById("userList"); // Obtém o elemento da lista de usuários
        userList.innerHTML = ""; // Limpa a lista de usuários

        users.forEach((user) => {
            const li = document.createElement("li"); // Cria um novo elemento <li>

            // Define o texto do <li> com o nome e email do usuário
            li.innerHTML = `
             <strong>ID:</strong> ${user.id}<br>
                <strong>NOME:</strong> ${user.nome}<br>
                <strong>EMAIL:</strong> ${user.email}<br>
                <hr> <!-- Adiciona uma linha horizontal para separar os usuários -->
            ` ;
            userList.appendChild(li); // Adiciona o <li> à lista de usuários
        });
    } catch (error) {
        console.error("Erro ao buscar usuários:", error); // Exibe o erro no console
    }
}

fetchUsers(); // Chama a função para buscar usuários ao carregar a página