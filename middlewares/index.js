const validaCampos = require('../middlewares/validar-campos');
const validaJWT = require('../middlewares/validar-jwt');
const validRoles = require('../middlewares/validar-roles');

module.exports = {
    ...validaCampos,
    ...validaJWT,
    ...validRoles,
}