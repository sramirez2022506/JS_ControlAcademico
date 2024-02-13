const Role = require('../models/role');
const Student = require('../models/estudiante');

const RoleValido = async (role = '') => {
    const existeRol = await Role.findOne({ role });
    if (!existeRol) {
        throw new Error(`El rol ${role} no existe en la base de datos`);
    }
}

const emailExistente = async (correo = '') => {
    const existeEmail = await Student.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo ${correo} ya esta en uso`);
    }
}

const existeEstudianteById = async (id = '') => {
    const existeStudent = await Student.findOne({ id });
    if (existeStudent) {
        throw new Error(`El estudiante con el ${id} no existe`);
    }
}

module.exports = {
    RoleValido,
    emailExistente,
    existeEstudianteById
}