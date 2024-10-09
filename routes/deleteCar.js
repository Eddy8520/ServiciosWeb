var express = require('express');
const {verifyToken} = require("../helper/Token");
const {executeQuery} = require("../DBConection/conection");
var router = express.Router();

/**
 * @swagger
 * /delete-carById:
 *   post:
 *     summary: Eliminar un carro por ID
 *     description: Elimina un carro de la base de datos dado su `id_Vehiculo`.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_Vehiculo:
 *                 type: integer
 *                 example: 1
 *                 description: ID del carro a eliminar.
 *     responses:
 *       200:
 *         description: Carro eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Carro eliminado exitosamente
 *       400:
 *         description: Todos los campos son obligatorios
 *       500:
 *         description: Error al eliminar el carro en la base de datos
 */

router.post('/', verifyToken,function(req, res) {
    const { id_Vehiculo } = req.body;

    if (!id_Vehiculo) {
        return res.status(400).json({ status:400, error: 'Todos los campos son obligatorios' });
    }

    const query = `Delete From usuario_carro where id = ?`
    const values = [id_Vehiculo];

    executeQuery(query, values)
        .then(results => {
            res.status(201).json({  status:200, message: 'Carro eliminado exitosamente' });
        })
        .catch(err => {
            console.error('Error al eliminar el Carro:', err);
            res.status(500).json({status:500, error: 'Error al eliminar el carro en la base de datos' });
        })

})

module.exports = router;
