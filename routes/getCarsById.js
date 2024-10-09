var express = require("express");
const {verifyToken} = require("../helper/Token");
const {executeQuery} = require("../DBConection/conection");
const router = express.Router();

/**
 * @swagger
 * /get-carsById:
 *   post:
 *     summary: Obtener los carros de un usuario por ID
 *     description: Devuelve todos los carros asociados al `usuario_id` especificado.
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
 *                 description: ID del usuario cuyos carros se desean obtener.
 *     responses:
 *       200:
 *         description: Lista de carros asociados al usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 user:
 *                   type: integer
 *                   example: 1
 *                 results:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       usuario_id:
 *                         type: integer
 *                         example: 1
 *                       modelo:
 *                         type: string
 *                         example: "Corolla"
 *                       marca:
 *                         type: string
 *                         example: "Toyota"
 *                       color:
 *                         type: string
 *                         example: "Rojo"
 *                       kilometraje:
 *                         type: integer
 *                         example: 5000
 *       400:
 *         description: Todos los campos son obligatorios
 *       500:
 *         description: Error al obtener los carros del usuario
 */

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
                return res.status(200).json({status:200,user:id_Usuario, results: results});
            }else {
                return res.status(200).json({status:200,message: 'Este Usuario no tiene carros'});
            }

        })
        .catch(err => {
            console.error('Error al agregar el Carro:', err);
            res.status(500).json({status:500, error: 'Error el usuario no existe' });
        })


})

module.exports = router;
