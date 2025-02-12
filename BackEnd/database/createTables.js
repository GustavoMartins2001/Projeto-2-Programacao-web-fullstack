const pool = require('./db'); 


// cria as tabelas necessárias para rodar o projeto. Caso já existam, nao faz nada.
const createTables = async () => {
    try {
        const createUsuariosTable = `
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;

        await pool.query(createUsuariosTable);
        console.log('Tabela "user" criada ou já existente.');

        const createCatimageCode = `
        CREATE TABLE IF NOT EXISTS catimagecode (
        id INT NOT NULL,
        curtida TINYINT NULL,
		imageCode varchar(100),
        PRIMARY KEY (id));
    `;

        await pool.query(createCatimageCode);
        console.log('Tabela "catimagecode" criada ou já existente.');

        const createUserInteraction = `
            CREATE TABLE IF NOT EXISTS userinteraction (
                id INT NOT NULL,
                userId INT NOT NULL,
                catImageCodeId INT NOT NULL,
                commentt VARCHAR(200),
                favourite BOOLEAN,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (id),
                CONSTRAINT FK_User_UserInteraction
                    FOREIGN KEY (userId)
                    REFERENCES users (id)
                    ON DELETE CASCADE
                    ON UPDATE NO ACTION,
                CONSTRAINT FK_CatImageCode_UserInteraction
                    FOREIGN KEY (catImageCodeId)
                    REFERENCES catimagecode (id)
                    ON DELETE CASCADE
                    ON UPDATE NO ACTION);
                    `;

        await pool.query(createUserInteraction);
        console.log('Tabela "userinteraction" criada ou já existente.');

    } catch (err) {
        console.error('Erro ao criar tabelas:', err);
    } finally {
        // Fecha a conexão com o banco
        await pool.end();
    }
};

createTables();
