const mongoose = require('mongoose');


const getConnection = async () => {

    try {
        //const url = 'mongodb://walterc:iudwalterc@cluster0-shard-00-00.as79n.mongodb.net:27017,cluster0-shard-00-01.as79n.mongodb.net:27017,cluster0-shard-00-02.as79n.mongodb.net:27017/inventarios-iud?ssl=true&replicaSet=atlas-6y8rya-shard-0&authSource=admin&retryWrites=true&w=majority'
        
        const url = 'mongodb://walterc:iudwalterc@ac-x41ga8l-shard-00-00.y6u9owk.mongodb.net:27017,ac-x41ga8l-shard-00-01.y6u9owk.mongodb.net:27017,ac-x41ga8l-shard-00-02.y6u9owk.mongodb.net:27017/inventarios-iud?ssl=true&replicaSet=atlas-3bz78a-shard-0&authSource=admin&retryWrites=true&w=majority'
        await mongoose.connect(url);
        console.log('Conexion exitosa');

    } catch (error){
        console.log (error);
    }    
}

module.exports = {
    getConnection,
}