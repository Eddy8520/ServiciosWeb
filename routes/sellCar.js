var express = require('express');
const {verifyToken} = require("../helper/Token");
const {executeQuery} = require("../DBConection/conection");
const router = express.Router();

/**
 * @swagger
 * /update-owner:
 *   post:
 *     summary: Actualizar el propietario de un carro
 *     description: Cambia el `usuario_id` de un carro en la tabla `usuario_carro`, asignando un nuevo propietario.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_Comprador:
 *                 type: integer
 *                 example: 1
 *                 description: ID del nuevo propietario del carro.
 *               id_Vehiculo:
 *                 type: integer
 *                 example: 123
 *                 description: ID del carro que se va a transferir.
 *     responses:
 *       201:
 *         description: Carro vendido exitosamente
 *       400:
 *         description: Todos los campos son obligatorios
 *       500:
 *         description: Error al actualizar el propietario en la base de datos
 */

router.post('/',verifyToken,function(req,res){
    const {id_Comprador, id_Vehiculo } = req.body;

    if(!id_Comprador || !id_Vehiculo){
        return res.status(400).json({ status:400, error: 'Todos los campos son obligatorios' });
    }

    const query = `UPDATE usuario_carro SET usuario_id = ? WHERE id = ?`
    const values = [id_Comprador, id_Vehiculo];

    executeQuery(query, values)
        .then(results => {
            res.status(201).json({  status:201, message: 'Carro vendido exitosamente'});
        })
        .catch(err => {
            console.error('Error al vender el Carro:', err);
                res.status(500).json({status:500, error: 'Error al actulizar el propietario en la base de datos' });
        })

})


module.exports = router;

