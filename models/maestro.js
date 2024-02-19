const { Schema, model } = require('mongoose');

const TeacherSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del maestro es obligatorio'],
    },

    correo: {
        type: String,
        required: [true, 'El correo del maestro es obligatorio'],
        unique: true
    },

    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },

    role: {
        type: String,
        required: true,
        enum: ["STUDENT_ROLE"]
    },

    curso: {
        type: String,
        required: true,
        enum: ["TEACHER_ROLE"]
    },

    estado: {
        type: Boolean,
        default: true
    }
});

module.exports = model('Teacher', TeacherSchema);