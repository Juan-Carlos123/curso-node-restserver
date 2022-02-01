const { Router, response } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const routerAuth = Router();

routerAuth.post('/login',[
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').notEmpty(),
    validarCampos
] , login );

routerAuth.post('/google',[
    check('id_token', 'id_token de gogle es obligatorio').not().isEmpty(),
    validarCampos
] , googleSignIn );

module.exports = {
    routerAuth
}