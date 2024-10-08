var express = require("express");
const {verifyToken} = require("../helper/Token");
const {executeQuery} = require("../DBConection/conection");
const router = express.Router();

router.post('/',verifyToken, function(req, res) {
    const {id_Usuario} = req.body;
    console.log("get user cars by id",id_Usuario);

    if(!id_Usuario){
        return res.status(400).json({ status:400, error: 'Todos los campos son obligatorios' });
    }

    const query = `SELECT * FROM usuario_carro WHERE usuario_id = ?`
    const values = [id_Usuario]
    executeQuery(query, values)
        .then(results => {
            if(results.length > 0){
                return res.status(201).json({status:201,user:id_Usuario, results: results});
            }else {
                return res.status(401).json({status:401,message: 'Este Usuario no tiene carros'});
            }

        })
        .catch(err => {
            console.error('Error al agregar el Carro:', err);
            res.status(500).json({status:500, error: 'Error el usuario no existe' });
        })


})

module.exports = router;
