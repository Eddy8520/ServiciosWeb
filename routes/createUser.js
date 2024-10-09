var express = require('express');
const { executeQuery } = require("../DBConection/conection");
const {hashPassword} = require("../helper/Encripta");
var router = express.Router();


/**
 * @swagger
 * /create-user:
 *   post:
 *     summary: Crear un nuevo usuario
 *     description: Crea un nuevo usuario en la base de datos con un password encriptado.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "johndoe"
 *                 description: Nombre del usuario
 *               email:
 *                 type: string
 *                 example: "johndoe@example.com"
 *                 description: Correo electrónico del usuario
 *               password:
 *                 type: string
 *                 example: "securePassword123"
 *                 description: Contraseña del usuario
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: Usuario creado exitosamente
 *                 userId:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: Todos los campos son obligatorios
 *       500:
 *         description: Error al insertar el usuario en la base de datos
 */

router.post('/', function(req, res, next) {

    const { username, email, password } = req.body;
    console.log("recibido", username, email, password);

    if (!username || !email || !password) {
        return res.status(400).json({status:400, error: 'Todos los campos son obligatorios' });
    }

    const PasswordHashed = async () => {
        const newPassWord = await hashPassword(password);

        const query = `INSERT INTO Usuarios (nombre, email, password, activo) VALUES (?, ?, ?, ?)`;
        const values = [username, email, newPassWord, true];

        executeQuery(query, values)
            .then(results => {
                res.status(201).json({  status:201, message: 'Usuario creado exitosamente', userId: results.insertId });
            })
            .catch(err => {
                console.error('Error al insertar el usuario:', err);
                res.status(500).json({status:500, error: 'Error al insertar el usuario en la base de datos' });
            });
    }

    PasswordHashed();
});

module.exports = router;
