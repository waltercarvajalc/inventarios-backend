const { Router } = require('express');
const { validationResult, check} = require('express-validator');
const router = Router();
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

router.post('/', [
        
        check('email', 'email.requerido').isEmail(),
        check('password', 'password.requerido').not().isEmpty(),
        
    ],  
    async function(req, res){

        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ mensaje: errors.array()});
            }

            const usuario = await Usuario.findOne({email: req.body.email});
            if (!usuario) {
                return res.status(400).send({ mensaje: 'User not found'});
            }

            const esIgual = bcrypt.compareSync(req.body.password, usuario.password);
            if (!esIgual){
                return res.status(400).send({ mensaje: 'User not found'});
            }

            //generar token
            const token = generarJWT(usuario);

            res.json({ _id: usuario._id, nombre: usuario.nombre, rol: usuario.rol, email: usuario.email, access_token: token });
            
        } catch (error) {
            console.log(error);
            res.status(500).json({ mensaje: 'Internal server error'});
        }

    });

    module.exports = router;
