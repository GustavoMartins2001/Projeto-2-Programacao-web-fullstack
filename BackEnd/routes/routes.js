const express = require('express');
const router = express.Router();
const pool = require('../database/db');

// GET user by email
router.get('/login', async (req, res) => {
    const { email, password } = req.query;

    if (!email) {
        return res.status(400).json({ error: 'Email e necessario' });
    }
    if (!password) {
        return res.status(400).json({ error: 'Senha e necessaria' });
    }

    try {
        const getUserQuery = `SELECT password, email FROM projeto2.users WHERE email = '${email}';`;
        console.log(getUserQuery)
        let user = await pool.query(getUserQuery);
        
        console.log(user[0][0])
        if (user == undefined || user.length === 0) {
            return res.status(404).json({ error: 'Usuario nao encontrado' });
        }
        else if(user[0][0].password != password)
        {
            return res.status(400).json({ error: 'Senha incorreta'})
        }

        res.json(user); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST img - salva hash da imagem no banco de dados ou da um like caso ja exista
router.post('/img', async (req, res) => {
    const { imageCode } = req.query;
    try {
        const imgExistsQuery = `SELECT EXISTS(SELECT 1 FROM catimagecode WHERE imageCode = '${imageCode}') AS 'exists'`;
        let imgExists = await pool.query(imgExistsQuery);
        let imgQuery = ''
        if(imgExists[0][0].exists == 0){
            imgQuery = `INSERT INTO catimagecode (curtida, imageCode) VALUES ('1', '${imageCode}')`;
        }
        else {
            imgQuery = `UPDATE catimagecode SET curtida = curtida + 1 WHERE imageCode = '${imageCode}'`;
        }

        await pool.query(imgQuery);
        res.json(); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/img/top-5', async (req, res) => {
    const { imageCode } = req.query;
    try {
        imgQuery = `SELECT imageCode FROM catimagecode order by curtida DESC limit 5;`;

        const response = await pool.query(imgQuery);
        console.log(response[0]);
        res.json(response[0]); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

module.exports = router;
