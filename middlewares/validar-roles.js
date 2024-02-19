const { response } = require("express");


const esAdminRole = (req, res, next) => {
    if(!req.usuario){
        return res.status(500).json({
            msg: "Se desea validar al estudiante sin validar token primero"
        });
    }

    const { role, nombre } =  req.student;

    if(role !== "TEACHER_ROLE"){
        return res.status(401).json({
            msg: `${nombre} no es un maestro, no puede usar este endpoint`
        });
    };
    next();
}

const tieneRolAutorizado = (...roles) => {
    return (req =request, res = response, next) =>{
        if(!req.student){
            return res.status(500).json({
                msg: "Se desea validar un estudiante sin validar token primero"
            });
        }
    
        if(!roles.includes(req.student.role)){
            return res.status(401).json({
                msg: `El servicio requiere uno de los siguientes roles autorizados ${roles}`
            });
        }
        next();
    }
}

module.exports = {
    esAdminRole,
    tieneRolAutorizado
}