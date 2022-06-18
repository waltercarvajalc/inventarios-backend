const { Router } = require('express');
const Inventario = require('../models/Inventario');
const { validarInventario } = require('../helpers/validar-inventario');


const router = Router();

router.get('/', async function(req, res){
    try{
        const inventarios = await Inventario.find().populate([
            {
                path: 'usuario', select: 'nombre email estado'

            },
            {
                path: 'marca', select: 'nombre estado'

            },
            {
                path: 'tipoEquipo', select: 'nombre estado'

            },
            {
                path: 'estadoEquipo', select: 'nombre estado'

            }
        ]);

        res.send(inventarios);
        
    }catch(error){
        console.log(error);
        res.status(500).send('Ocurrio un error al consultar inventarios');
    }
});

router.post('/', async function(req, res){
    try {
        
        const validaciones = validarInventario(req);

        if (validaciones.length > 0) {
            return res.status(400).send(validaciones);
           }
       
        const existeInventarioPorSerial = await Inventario.findOne({ serial: req.body.serial });
        if (existeInventarioPorSerial) {
            return res.status(400).send('Ya existe el serial para otro equipo');
        }

        let inventario = new Inventario();
        inventario.serial = req.body.serial;
        inventario.modelo = req.body.modelo;
        inventario.descripcion = req.body.descripcion;
        inventario.foto = req.body.foto;
        inventario.color = req.body.color;
        inventario.fechaCompra = req.body.fechaCompra;
        inventario.precio = req.body.precio;
        inventario.usuario = req.body.usuario._id;
        inventario.marca = req.body.marca._id;
        inventario.tipoEquipo = req.body.tipoEquipo._id;
        inventario.estadoEquipo = req.body.estadoEquipo._id;
        inventario.fechaCreacion = new Date();
        inventario.fechaActualizacion = new Date();
    
        inventario = await inventario.save();
        res.send(inventario);

    }catch(error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al consultar inventarios');
    }
    
});



router.put('/:inventarioId', async function(req, res){
    try {
        let inventario = await Inventario.findById(req.params.inventarioId);
        if (!inventario) {
            return res.status(400).send('Inventario no existe');
        }

        const existeInventarioPorSerial = await Inventario
            .findOne({ serial: req.body.serial, _id: { $ne: inventario._id } });
        if (existeInventarioPorSerial) {
            return res.status(400).send('Ya existe el serial para otro equipo');
        }

        inventario.serial = req.body.serial;
        inventario.modelo = req.body.modelo;
        inventario.descripcion = req.body.descripcion;
        inventario.foto = req.body.foto;
        inventario.color = req.body.color;
        inventario.fechaCompra = req.body.fechaCompra;
        inventario.precio = req.body.precio;
        inventario.usuario = req.body.usuario._id;
        inventario.marca = req.body.marca._id;
        inventario.tipoEquipo = req.body.tipoEquipo._id;
        inventario.estadoEquipo = req.body.estadoEquipo._id;
        inventario.fechaActualizacion = new Date();
        
        inventario = await inventario.save();
        res.send(inventario);

    }catch(error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al consultar inventarios');
    }
    
});

router.get('/:inventarioId', async function(req, res) {
    try {
        const inventario = await Inventario.findById(req.params.inventarioId);
        if(!inventario) {
            return res.status(404).send('Inventario no existe');
        }
        res.send(inventario);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al consultar inventarios');
    }
})

module.exports = router;