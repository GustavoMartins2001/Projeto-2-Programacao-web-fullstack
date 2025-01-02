const express = require('express');
// require('dotenv').config({path: '.env'});
const cors = require('cors');

const app = express();

app.use(cors({ 
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));
  
app.use(express.json());
app.use(express.urlencoded({extended: true}))



const PORT = process.env.PORT || 4200;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));