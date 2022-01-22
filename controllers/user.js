const { request ,response } = require('express');

const userGet = (req, res = response) => {
    const { nombre, edad, sexo = 'm' } = req.query;
    res.json({
        ok : true,
        msg : 'Gep API - controllers - Bonilla',
        nombre,
        edad,
        sexo
    });
};

const userPost = (req, res) => {
    const {nombre , edad} = req.body;
    res.json({
        ok : true,
        msg : 'Post API - controllers',
        nombre, 
        edad
    });
};

const userPut =  (req, res) => {
    const  { id } = req.params;
    res.json({
        ok : true,
        msg : 'Put API - controllers',
        id
    });
};

const userDelete = (req, res) => {
    res.json({
        ok : true,
        msg : 'Delete API - controllers'
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