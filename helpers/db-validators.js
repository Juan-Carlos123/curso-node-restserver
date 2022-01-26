const Role = require('../models/role');
const Usuario = require('../models/usuario');

//verificar si el rol existe en la base de datos
const validarRole =  async(rol = "")=> {

    const existeRol = await Role.findOne({rol}) ;
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la base de datos`)
    }

};

//Verificar si el correo existe
const emailExiste = async(correo = "")=>{
    
    const existeCorreo = await Usuario.findOne({correo});
    if (existeCorreo) {
        throw new Error(`Este correo: ${correo} ya existe`);
        //return res.status(400).json({
            //msg : "Este correo ya existe",
        //});
    };
};

//Verificar si el Id existe
const idExiste = async(id)=>{
    
    const existeId = await Usuario.findById(id)
    if (!existeId) {
        throw new Error(`No existe este Id: ${id} en la base de datos`);
        //return res.status(400).json({
            //msg : "Este correo ya existe",
        //});
    };
};

module.exports = {
    validarRole,
    emailExiste,
    idExiste,
}