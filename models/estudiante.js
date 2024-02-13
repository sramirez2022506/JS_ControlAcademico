const { Schema, model } = require('mongoose');

const StudentSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del estudiante es obligatorio'],
    },

    correo: {
        type: String,
        required: [true, 'El correo del estudiante es obligatorio'],
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

    estado: {
        type: Boolean,
        default: true
    }
});

module.exports = model('Student', StudentSchema);