const {validationResult} = require('express-validator');

 //validar si es correo o no---- 
const validarCampos = (req, res, next) =>{
    
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
         return res.status(400).json(errors);
     }

     next();

}

module.exports = {
    validarCampos,
}