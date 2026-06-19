require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const db = require('./models');
const cors = require('cors');
const path = require('path');

// 1. CORS primero que todo
app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200
}));

// Servir archivos subidos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 2. PARSERS DEL BODY OBLIGATORIAMENTE ANTES DE LAS RUTAS
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json()); 

// 3. LAS RUTAS AL FINAL, CUANDO YA SE PARSEÓ EL BODY
require('./routes')(app);

db.sequelize.sync({
    // force: true 
}).then(() => {
    console.log('Base de datos sincronizada.');
});

app.listen(port, () => {
    console.log(`OnlyFlans API corriendo en el puerto ${port}`);
});