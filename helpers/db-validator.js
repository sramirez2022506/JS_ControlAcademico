const Role = require('../models/role');
const Curso = require('../models/curso');
const Student = require('../models/estudiante');
const Teacher = require('../models/maestro');

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

const existeMaestroById = async (id = '') => {
    const existeTeacher = await Teacher.findOne({ id });
    if (existeTeacher) {
        throw new Error(`El maestro con el ${id} no existe`);
    }
}

const CursoValido = async (curso = '') => {
    const existeCurso = await Curso.findOne({ curso });
    if (!existeCurso) {
        throw new Error(`El curso ${curso} no existe en la base de datos`);
    }
}

module.exports = {
    RoleValido,
    emailExistente,
    existeEstudianteById,
    existeMaestroById,
    CursoValido
}