var express = require('express');
const {verifyToken} = require("../helper/Token");
const {executeQuery} = require("../DBConection/conection");
const router = express.Router();

/**
 * @swagger
 * /getUsers:
 *   get:
 *     summary: Obtener todos los usuarios
 *     description: Devuelve una lista de todos los usuarios registrados en la base de datos.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios
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
 *                       nombre:
 *                         type: string
 *                         example: "Juan Pérez"
 *                       email:
 *                         type: string
 *                         example: "juan.perez@example.com"
 *                       activo:
 *                         type: boolean
 *                         example: true
 *       500:
 *         description: Error al cargar los usuarios
 */

router.get('/', verifyToken,function(req, res) {

    console.log('Headers:', req.headers);


    const query = `SELECT * FROM usuarios`;

    executeQuery(query, [])
        .then(results => {
            if(results.length > 0){
                return res.status(200).json({status:200, results: results});
            }else {
                return res.status(200).json({status:200,message: 'No hay usuarios'});
            }

        })
        .catch(err => {
            console.error('Error al cargar el Usuario:', err);
            res.status(500).json({status:500, error: 'Error al cargar usuarios no existe' });
        })

})

module.exports = router;
