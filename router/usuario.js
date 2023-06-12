const { Router } = require('express');
const { validationResult, check} = require('express-validator');
const router = Router();
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { validarJWT } = require('../middleware/validar-jwt');
const { validarRolAdmin } = require('../middleware/validar-rol-admin');

router.post('/', 
    [
        check('nombre', 'nombre.requerido').not().isEmpty(),
        check('email', 'email.requerido').isEmail(),
        check('rol', 'rol.requerido').isIn(['ADMIN', 'DOCENTE']),
        check('password', 'password.requerido').not().isEmpty(),
        validarJWT,
        validarRolAdmin
        //check('estado', 'estado.requerido').isIn('Activo', 'Inactivo'),
    ],  
    async function(req, res){

    try{

        console.log('objeto recibido', req.body);

        const existeUsuario =  await Usuario.findOne({email: req.body.email});
        console.log('Respuesta existe usuario', existeUsuario);

        if (existeUsuario){
            return res.send('email ya existe');
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ messages: errors.array()});
        }

        let usuario = new Usuario();
        usuario.nombre = req.body.nombre;
        usuario.email = req.body.email;
        usuario.rol = req.body.rol;

        const salt = bcrypt.genSaltSync();      
        const password = bcrypt.hashSync(req.body.password, salt);
        usuario.password = password;

        //usuario.estado = req.body.estado;
        usuario.fechaCreacion = new Date();
        usuario.fechaActualizacion = new Date();

        usuario = await usuario.save();

        res.send(usuario);

    } catch(error){
        console.log(error);
        res.send('Ocurrio un error');
    }

    

});

router.get('/', [ validarJWT, validarRolAdmin ], async function(req, res){
   try{
    const usuarios = await Usuario.find();
    res.send(usuarios);

   }catch(error) {
    console.log(error);
    res.send('Ocurrio un error');
   }
});
/*
//listar usuarios activos
router.get('/:usuarioActivo', async function (req, res) {

    try{
        const query = { estado: 'Activo'};
        const usuarioActivo = await Usuario.find(query);
        res.send(usuarioActivo);
    }catch(error){
        console.log(error);
    res.send('Ocurio un error');
        }
});
*/

router.put('/:usuarioId',
    [
        check('nombre', 'nombre.requerido').not().isEmpty(),
        check('email', 'email.requerido').isEmail(),
        check('rol', 'rol.requerido').isIn(['ADMIN', 'DOCENTE']),
        check('password', 'password.requerido').not().isEmpty(),
        validarJWT,
        validarRolAdmin
        //check('estado', 'estado.requerido').isIn('Activo', 'Inactivo'),
    ],

async function(req, res){
    try{

        console.log('objeto recibido', req.body, req.params);

        let usuario =  await Usuario.findById(req.params.usuarioId);

        if (!usuario) {
            return res.send('Usuario no existe');
        }
        
        const existeUsuario =  await Usuario
                .findOne({email: req.body.email, _id: { $ne: usuario._id } });

        if (existeUsuario){
            return res.send('Email ya existe');
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ messages: errors.array()});
        }

        usuario.nombre = req.body.nombre;
        usuario.email = req.body.email;
        usuario.estado = req.body.estado;
        usuario.fechaActualizacion = new Date();

        usuario = await usuario.save();

        res.send(usuario);

    } catch(error){
        console.log(error);
        res.send('Ocurrio un error');
    }
});


module.exports = router;
