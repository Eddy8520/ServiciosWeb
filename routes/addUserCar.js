var express = require('express');
const {verifyToken} = require("../helper/Token");
const {executeQuery} = require("../DBConection/conection");
const router = express.Router();

router.post('/',verifyToken, function(req, res) {
    const {id_Usuario, modelo, marca, color, kilometraje} = req.body;
    console.log("add user cars",id_Usuario, modelo, marca, color, kilometraje);

    if(!id_Usuario || !modelo || !marca || !color || !kilometraje){
        return res.status(400).json({ status: 400 ,error: 'Todos los campos son obligatorios' });
    }

    const query = `iNSERT INTO usuario_carro (id,usuario_id, modelo, marca, kilometraje, color, terminado) VALUES (?,?,?,?,?,?,?)`
    const values = [0,id_Usuario,modelo,marca,kilometraje,color,true]
    executeQuery(query, values)
        .then(results => {
            res.status(201).json({status:201 , message:"auto Agregado exitosamente"});
        })
        .catch(err => {
            console.error('Error al agregar el Carro:', err);
            res.status(500).json({status:500 , error: 'Error al insertar el Carro en la base de datos' });
        })


})

module.exports = router;
