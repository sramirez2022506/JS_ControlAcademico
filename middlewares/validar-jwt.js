const jwt = require('jsonwebroken');
const Student = require('../models/estudiante');
const {request, response} = require('express');

const validarJWT = async(req = request, res = response, next)=>{
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la peticion',
        });
    }

    try{
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const student = await Student.findById(uid);
        if(!student){
            return res.status(401).json({
                msg: "El estudiante no existe en la base de datos"
            });
        }
        if(!student.estado){
            return res.status(401).json({
                msg: "Token no valido, estudiante cin estado false"
            });
        }
        req.student = student;
        next();
    }catch(e){
        console.log(e);
        res.status(401).json({
            msg: "Token no valido"
        })
    }
}

module.exports = {
    validarJWT
}