const bcryptjs = require('bcryptjs');
const Teacher = require('../models/maestro');
const { response } = require('express');

const teacherPost = async(req, res) => {
    const { nombre, correo, password, role, curso } = req.body;
    const teacher = new Teacher({ nombre, correo, password, role, curso });

    const salt = bcryptjs.genSaltSync();
    teacher.password = bcryptjs.hashSync(password, salt);

    await teacher.save();
    res.status(202).json({
        teacher
    });
}

const teacherGet = async (req, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };

    const [total, teachers] = await Promise.all([
        Teacher.countDocuments(query),
        Teacher.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        teachers
    });
}

const teachersGetById = async (req, res) => {
    const { id } = req.params;
    const teacher = await Teacher.findOne({ _id: id });

    res.status(200).json({
        teacher
    });
}

const putTeacher = async (req, res = response) => {
    const { id } = req.params;
    const { _id, password, correo, ...resto } = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const teacher = await Teacher.findByIdAndUpdate(id, resto);

    res.status(200).json({
        msg: 'Maestro actualizado correctamente', teacher
    });
}

const teacherDelete = async (req, res) => {
    const {id} = req.params;
    const teacher = await Teacher.findByIdAndUpdate(id, {estado: false});

    res.status(200).json({
        msg: 'Maestro eliminado exitosamente',
        teacher
    });
}

module.exports = {
    teacherPost,
    teacherGet,
    teachersGetById,
    putTeacher,
    teacherDelete
}