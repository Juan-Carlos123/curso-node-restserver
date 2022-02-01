const bcryptjs = require('bcryptjs');
const { response } = require('express');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');

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

const googleSignIn = async(req, res = response) => {

    const { id_token} = req.body;

    try {

        const {nombre, correo, img} = await googleVerify(id_token);
        //console.log(googleUser);
        let usuario = await Usuario.findOne({correo});

        if (!usuario) {
            //Tengo que crearlo
            const data = {
                nombre,
                correo,
                img,
                rol : 'USER_ROLE',
                password : 'pD',
                google : true,
            };

            usuario = new Usuario(data);
            await usuario.save();
        }

        //Si el usuario esta DB
        if (!usuario.estado) {
            return res.status(400).json({
                msg : 'Hable con el administrador, usuario boqueado',
            });
        }

        //Generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            msg : 'Todo bien',
            usuario,
            token,
        });

    } catch (error) {
        res.status(400).json({
            ok : false,
            msg : 'El token no se pudo verificar',
        });
    }
    
}

module.exports = {
    login,
    googleSignIn,
};