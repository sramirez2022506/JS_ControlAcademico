const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { studentGet } = require('../controllers/student.controller');

const router = Router();

router.get("/", studentGet);

