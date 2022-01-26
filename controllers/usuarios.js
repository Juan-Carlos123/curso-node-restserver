const { request ,response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');


const userGet = async(req, res = response) => {
    //const { nombre, edad, sexo = 'm' } = req.query;
    const { limite = 5, desde = 0 } = req.query;
    const query = {estado : true};

    //const usuarios = await Usuario.find(query)
        //.skip(Number(desde))
        //.limit(Number(limite));

    //const total = await Usuario.countDocuments(query);

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite)),
    ]);

    res.json({
        //ok : true,
        //msg : 'Gep API - controllers - Bonilla',
        total,
        usuarios
    });
};

const userPost = async(req, res) => {

    const { nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol});

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt)

    //Guardar en DB
    await usuario.save();

    res.json({
        ok : true,
        msg : 'Post API - controllers',
        usuario
    });
};

const userPut =  async(req, res) => {
    const  { id } = req.params;
    const {password, google, correo, ...resto} = req.body;

    //Todo validar contra la base de de datos
    if (password) {
        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        ok : true,
        msg : 'Put API - controllers',
        resto
    });
};

const userDelete = async(req, res) => {
    const {id} = req.params;

    //Eliminar usuario fisicamente
    //const usuario = await Usuario.findByIdAndDelete(id);

    //Cambiar solo el estado
    const usuario = await Usuario.findByIdAndUpdate(id, {estado : false});

    res.json({
        msg : `Usuario con el Id: ${id} eliminado`,
        usuario
    });
};

const userPatch =  (req, res) => {
    res.json({
        ok : true,
        msg : 'Patch API - controllers'
    });
};

module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete,
    userPatch
}