const mongoose = require('mongoose');

const dbConnection = async() => {

    try {
        await mongoose.connect(process.env.MONGODB_ATLAS, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useCreateIndex: true,
            //useFindAndModify: false
        });

        console.log('Base de datos online conectado')
        
    } catch (error) {
        console.log(error);
        throw new Error('Error al conectarse a la base de datos online');
    }
}

module.exports = {
    dbConnection
}