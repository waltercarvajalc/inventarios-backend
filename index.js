const express = require('express');
const { getConnection } = require('./db/db-connection-mongo');
require('dotenv').config();

var cors = require('cors');

const app = express();
const port = process.env.PORT;

getConnection();

app.use(cors());

//parseo json
app.use(express.json());

app.use('/usuario', require('./router/usuario'));
app.use('/auth', require('./router/auth'));
app.use('/estado-equipo', require('./router/estadoEquipo'));
app.use('/marca', require('./router/marca'));
app.use('/tipo-equipo', require('./router/tipoEquipo'));
app.use('/inventario', require('./router/inventario'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});



