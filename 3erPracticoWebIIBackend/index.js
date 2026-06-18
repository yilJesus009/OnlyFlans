require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const db = require('./models');
const cors = require('cors');
const path = require('path');



// Servir archivos subidos (fotos, banners, imágenes de posts)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors({
  origin: '*',
  optionsSuccessStatus: 200
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('./routes')(app);

db.sequelize.sync({
    // force: true // descomentar solo para resetear la BD durante desarrollo
}).then(() => {
    console.log('Base de datos sincronizada.');
});

app.listen(port, () => {
    console.log(`OnlyFlans API corriendo en el puerto ${port}`);
});
