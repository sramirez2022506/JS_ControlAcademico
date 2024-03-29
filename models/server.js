const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');

class Server{
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.studentPath = '/api/estudiantes';
        this.teacherPath = '/api/maestros';

        this.conectarDB();
        this.middlewares();
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(express.static('public'));
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.studentPath, require('../routes/student.routes'))
        this.app.use(this.teacherPath, require('../routes/teacher.routes'))
    }

    listen() {
        this.app.listen(this.port, () => {
           console.log('Servidor ejecutandose y escuchando al puerto', this.port) 
        });
    }
}

module.exports = Server;