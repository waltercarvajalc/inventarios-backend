const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ mensaje: 'Error unauthorizad'});
    }

    try {
        const payload = jwt.verify(token, '12345678');
        req.payload = payload;
        next();
        
    } catch (error) {
        console.log(error);
        return res.status(401).json({ mensaje: 'Error unauthorized'});
        
    }
}

module.exports = {
    validarJWT
}
