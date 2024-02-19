const bcryptjs = require('bcryptjs');
const Student = require('../models/estudiante');
const { response } = require('express');

const studentsPost = async(req, res) => {
    const { nombre, correo, password, role } = req.body;
    const student = new Student({ nombre, correo, password, role });

    const salt = bcryptjs.genSaltSync();
    student.password = bcryptjs.hashSync(password, salt);

    await student.save();
    res.status(202).json({
        student
    });
}

const studentGet = async (req, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };

    const [total, students] = await Promise.all([
        Student.countDocuments(query),
        Student.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        students
    });
}

const studentGetById = async (req, res) => {
    const { id } = req.params;
    const student = await Student.findOne({ _id: id });

    res.status(200).json({
        student
    });
}

const putStudents = async (req, res = response) => {
    const { id } = req.params;
    const { _id, password, correo, ...resto } = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const student = await Student.findByIdAndUpdate(id, resto);

    res.status(200).json({
        msg: 'Estudiante actualizado correctamente', student
    });
}

const studentsDelete = async (req, res) => {
    const {id} = req.params;
    const student = await Student.findByIdAndUpdate(id, {estado: false});

    res.status(200).json({
        msg: 'Estudiante eliminado exitosamente',
        student
    });
}

module.exports = {
    studentsPost,
    studentGet,
    studentGetById,
    putStudents,
    studentsDelete
}

