var express = require('express');
const {verifyToken} = require("../helper/Token");
const {executeQuery} = require("../DBConection/conection");
const router = express.Router();

/**
 * @swagger
 * /get-cars:
 *   get:
 *     summary: Obtener todos los carros
 *     description: Devuelve una lista de todos los carros registrados en la base de datos.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de carros
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
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
 *       500:
 *         description: Error al cargar los carros
 */

router.get('/', verifyToken,function(req, res) {

    const query = `SELECT * FROM usuario_carro`;

    executeQuery(query, [])
        .then(results => {
            if(results.length > 0){
                return res.status(200).json({status:200, results: results});
            }else {
                return res.status(200).json({status:200,message: 'No hay carros'});
            }

        })
        .catch(err => {
            console.error('Error al cargar el carros:', err);
            res.status(500).json({status:500, error: 'Error al cargar carros no existe' });
        })

})

module.exports = router;
