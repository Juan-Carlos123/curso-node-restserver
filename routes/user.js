const { Router } = require('express');
const { check } = require('express-validator');
const { validarRole, emailExiste, idExiste } = require('../helpers/db-validators');

//const { validarCampos } = require('../middlewares/validar-campos');
//const { validarJWT } = require('../middlewares/validar-jwt');
//const { esAdminRole, tieneRol } = require('../middlewares/validar-roles');

const { validarCampos,
        validarJWT,
        esAdminRole,
        tieneRol } = require('../middlewares');

const { userGet, 
        userPost, 
        userPut, 
        userDelete, 
        userPatch } = require('../controllers/usuarios');

const router = Router();

router.get('/', userGet );

router.post('/',[
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password debe tener como mínimo 6 caracteres').isLength({min : 6}),
        check('correo', 'Este no es un correo').isEmail(),
        check('correo').custom(emailExiste),
        //check('rol', 'Este no es un rol').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        check('rol').custom(validarRole),
        validarCampos,
], userPost);

router.put('/:id', [
        check('id', 'No es un Id válido').isMongoId(),
        check('id').custom(idExiste),
        check('rol').custom(validarRole),
        validarCampos,
], userPut);

router.delete('/:id',[
        validarJWT,
        //esAdminRole,
        tieneRol('ADMIN_ROLE', 'USER_ROLE', 'VENTAS_ROLE'),
        check('id', 'No es un Id válido').isMongoId(),
        check('id').custom(idExiste),
        validarCampos,
], userDelete );

router.patch('/', userPatch);

module.exports = router;