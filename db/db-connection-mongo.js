const mongoose = require('mongoose');


const getConnection = async () => {

    try {
        const url = 'mongodb://<usuario:password>@cluster0-shard-00-00.as79n.mongodb.net:27017,cluster0-shard-00-01.as79n.mongodb.net:27017,cluster0-shard-00-02.as79n.mongodb.net:27017/inventarios-iud?ssl=true&replicaSet=atlas-6y8rya-shard-0&authSource=admin&retryWrites=true&w=majority'
         await mongoose.connect(url);
        console.log('Conexion exitosa');

    } catch (error){
        console.log (error);
    }    
}

module.exports = {
    getConnection,
}