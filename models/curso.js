const { Schema, model } = require('mongoose');

const CursoSchema = Schema({
    curso: {
        type: String,
        required: [true, 'El curso es obligatorio']
    }
});

module.exports = model('Curso', CursoSchema);