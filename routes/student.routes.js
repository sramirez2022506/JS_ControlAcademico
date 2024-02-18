const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const {
    studentGet,
    studentsPost,
    studentsGetById,
    putStudents
} =require('../controllers/student.controller');

const { studentGet } = require('../controllers/student.controller');
const { existeEstudianteById } = require('../helpers/db-validator');

const router = Router();

router.get("/", studentGet);

router.get("/:id",
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existeEstudianteById),
        validarCampos
    ], studentsGetById);

router.post(
    "/",
    [
        check("nombre", "El nombre del estudiante no puede estar vacio").not().isEmpty(),
        check("correo", "El correo no puede estar vacio").not().isEmpty(),
        check("password", "La contraseña no puede estar vacio").not().isEmpty(),
        validarCampos
    ], studentsPost
);

router.put(
    "/:id",
    [
        check('id', 'No es un id valido').isMongoId(),
        checkk('id').custom(existeEstudianteById),
        validarCampos
    ], putStudents
);

module.exports = router;

