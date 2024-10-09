var express = require('express');
const {verifyToken} = require("../helper/Token");
const {executeQuery} = require("../DBConection/conection");
const router = express.Router();

/**
 * @swagger
 * /add-car-user:
 *   post:
 *     summary: Agregar un nuevo carro para un usuario
 *     description: Inserta un nuevo carro asociado a un usuario en la tabla `usuario_carro`.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_Usuario:
 *                 type: integer
 *                 example: 1
 *                 description: ID del usuario que está agregando el carro.
 *               modelo:
 *                 type: string
 *                 example: "Corolla"
 *                 description: Modelo del carro.
 *               marca:
 *                 type: string
 *                 example: "Toyota"
 *                 description: Marca del carro.
 *               color:
 *                 type: string
 *                 example: "Rojo"
 *                 description: Color del carro.
 *               kilometraje:
 *                 type: integer
 *                 example: 5000
 *                 description: Kilometraje del carro.
 *     responses:
 *       201:
 *         description: Carro agregado exitosamente
 *       400:
 *         description: Todos los campos son obligatorios
 *       500:
 *         description: Error al insertar el carro en la base de datos
 */


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
