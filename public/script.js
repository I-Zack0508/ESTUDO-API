const API_URL = 'http://localhost:3000/users';

// Quando o formulário for enviado, pega os dados e manda para o servidor
document.getElementById("userForm").addEventListener("submit", async (e) => {
    e.preventDefault(); // Não deixa a página recarregar

    const nome = document.getElementById("nome").value; // Pega o nome do usuário
    const email = document.getElementById("email").value; // Pega o email do usuário
    const senha = document.getElementById("senha").value; // Pega a senha do usuário

    try {
        const response = await fetch(API_URL, {
            method: "POST", // Diz que está criando algo novo
            headers: {
                "Content-Type": "application/json", // Diz que está enviando dados em formato JSON
            },
            body: JSON.stringify({ nome, email, senha }), // Manda os dados para o servidor
        });

        if (response.ok) {
            alert("Usuário cadastrado com sucesso!"); // Mostra que deu tudo certo
            document.getElementById("userForm").reset(); // Limpa o formulário
            fetchUsers(); // Atualiza a lista de usuários
        } else {
            const errorMessage = await response.text(); // Pega o erro do servidor
            alert("Erro ao cadastrar usuário: " + errorMessage); // Mostra o erro
        }
    } catch (error) {
        console.error("Erro", error); // Mostra o erro no console
        alert("CATCH Erro ao cadastrar usuário: " + error.message); // Mostra o erro de conexão
    }
});

// Função para buscar e mostrar todos os usuários
async function fetchUsers() {
    try {
        const response = await fetch(API_URL); // Pede ao servidor a lista de usuários
        const users = await response.json(); // Transforma a resposta em dados que podemos usar

        const userList = document.getElementById("userList"); // Pega o lugar onde vamos mostrar os usuários
        userList.innerHTML = ""; // Limpa a lista antes de mostrar os novos usuários

        users.forEach((user) => {
            const li = document.createElement("li"); // Cria um item para cada usuário
            li.innerHTML = `
                <strong>ID:</strong> ${user.id}<br>
                <strong>NOME:</strong> ${user.nome}<br>
                <strong>EMAIL:</strong> ${user.email}<br>
                <hr> <!-- Adiciona uma linha para separar os usuários -->
            `; // Mostra os dados do usuário
            userList.appendChild(li); // Coloca o item na lista
        });
    } catch (error) {
        console.error("Erro ao buscar usuários:", error); // Mostra o erro no console
    }
}

// Busca os usuários quando a página carrega
fetchUsers();