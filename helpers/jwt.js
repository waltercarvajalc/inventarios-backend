const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const generarJWT = (usuario) => {
    const payload = { _id: usuario._id, nombre: usuario.nombre, email: usuario.email,
        password: usuario.password, rol: usuario.rol };

    const token = jwt.sign(payload, '12345678', { expiresIn: '1h' });
    return token;
}

module.exports = {
    generarJWT
}
