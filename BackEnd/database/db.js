const mysql = require('mysql2/promise');

// Configurações da conexão
const pool = mysql.createPool({
    host: "127.0.0.1", // Endereço do servidor MySQL
    port: "3306",
    user: "root", // Usuário do banco
    password: "123", // Senha do banco
    database: "projeto2", // Nome do banco de dados
});

module.exports = pool;
