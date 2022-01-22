const express = require('express');

const cors = require('cors');
const router = require('../routes/user');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios/' 

        //Middlewares
        this.middlewares();

        //Rutas de mi aplicación
        this.rutas();
        
    };

    middlewares(){

        //Cors
        this.app.use(cors());

        //Directorio Público
        this.app.use(express.static('public'));

        //Analiza las solicitudes entrantes con cargas utiles JSON  y se basa en el analizador de cuerpo.
        this.app.use(express.json());
    };

    rutas(){
        this.app.use(this.usuariosPath, router)

    };
    
    listens(){

        this.app.listen(this.port, () => {
            console.log(`Escuchando en el puerto: ${this.port}`)
        })

    };
}

module.exports = Server;