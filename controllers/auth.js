const bcryptjs = require('bcryptjs');
const { response } = require('express');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async(req, res = response) => {
    const { correo, password } = req.body;

    try {

        //Verificar si el email existe
        const usuario = await Usuario.findOne({correo});
        if (!usuario) {
            return res.status(400).json({
                msg : 'No existe el correo',
            })
        };

        //Verificar si el usuario existe
        if (!usuario.estado) {
            return res.status(400).json({
                msg : 'No existe este usuario',
            })
        }

        //Verificar si el password existe
        const validarPassword = bcryptjs.compareSync(password, usuario.password)
        if (!validarPassword) {
            return res.status(400).json({
                msg : 'Password Incorrecto',
            })
        }

        //Generar el JWT
        const token = await generarJWT(usuario.id);
        
       res.json({
            usuario,
            token,
        });
        
    } catch (error) {
        console.log(error),
        res.status(500).json({
            msg : 'Consulte con el administrador',
        })
    }

    

};

module.exports = {
    login,
};