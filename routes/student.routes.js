const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const {
    studentGet,
    studentsPost,
    studentGetById,
    putStudents,
    studentsDelete
} =require('../controllers/student.controller');

const { existeEstudianteById, RoleValido, emailExistente } = require('../helpers/db-validator');

const router = Router();

router.get("/", studentGet);

router.get("/:id",
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existeEstudianteById),
        validarCampos
    ], studentGetById);

router.post(
    "/",
    [
        check("nombre", "El nombre del estudiante no puede estar vacio").not().isEmpty(),
        check("correo", "El correo no es valido").isEmail(),
        check("correo").custom(emailExistente),
        check("password", "La contraseña debe de ser de mas de 6 caracteres").isLength({min:6}),
        check("role").custom(RoleValido),
        validarCampos
    ], studentsPost
);

router.put(
    "/:id",
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existeEstudianteById),
        check("role").custom(RoleValido),
        validarCampos
    ], putStudents
);

router.delete(
    "/:id",
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existeEstudianteById),
        validarCampos
    ], studentsDelete
);

module.exports = router;

