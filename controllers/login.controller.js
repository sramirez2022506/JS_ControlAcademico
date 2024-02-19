const {
    request,
    response
} = require('express');

    const Student = require('../models/estudiante');
    const byCts = require('bcryptjs');
    const {
    generarJWT
} = require('../helpers/generar_jwt');

const login = async (req = request, res = response) => {

    const {correo,password} = req.body;

    try {
        const student = await Student.findOne({correo});

        if (!student) {
            return res.status(400).json({
                msg: "El correo no es correcto, porfavor volver a ingresar"
            });
        }

        if (!student.estado) {
            return res.status(400).json({
                msg: "El estudiante no existe en la base de datos"
            });
        }

        const validarClave = byCts.compareSync(password, student.password);
        if (!validarClave) {
            return res.status(400).json({
                msg: "La contraseña esta incorrecto"
            });
        }

            const token = await generarJWT(student.id);
            
        res.status(200).json({
            msg: "Bienvenido!!!",
            student,
            token
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: 'Mandar solicitud a algun administrador'
        });
    };
};

module.exports = {
    login
}