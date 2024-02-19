const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const {
    teacherGet,
    teacherPost,
    teachersGetById,
    putTeacher,
    teacherDelete
} =require('../controllers/teacher.controller');

const { existeMaestroById, RoleValido, emailExistente, CursoValido } = require('../helpers/db-validator');

const router = Router();

router.get("/", teacherGet);

router.get("/:id",
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existeMaestroById),
        validarCampos
    ], teachersGetById);

router.post(
    "/",
    [
        check("nombre", "El nombre del maestro no puede estar vacio").not().isEmpty(),
        check("correo", "El correo no es valido").isEmail(),
        check("correo").custom(emailExistente),
        check("password", "La contraseña debe de ser de mas de 6 caracteres").isLength({min:6}),
        check("role").custom(RoleValido),
        check("curso").custom(CursoValido),
        validarCampos
    ], teacherPost
);

router.put(
    "/:id",
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existeMaestroById),
        check("role").custom(RoleValido),
        check("curso").custom(CursoValido),
        validarCampos
    ], putTeacher
);

router.delete(
    "/:id",
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existeMaestroById),
        validarCampos
    ], teacherDelete
);

module.exports = router;