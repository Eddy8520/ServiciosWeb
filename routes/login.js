var express = require('express');
const {executeQuery} = require("../DBConection/conection");
const {hashPassword} = require("../helper/Encripta");
const {verifyPassword} = require("../helper/ComparePass");
const {sign} = require("jsonwebtoken");
var router = express.Router();

const SECRET_KEY = '#Admin123';

router.post('/', function(req, res) {

    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send({error: 'Email and password is required'});
    }

    const login = async () => {
        const query = `SELECT * FROM Usuarios WHERE email = ?`;
        const values = [email]

        executeQuery(query, values)
            .then(async results => {
                if (results.length > 0) {
                    // Usuario encontrado
                    console.log('Usuario encontrado:', results[0]);
                    const user = results[0];
                    const nombre = user.nombre;
                    const verficatedUser = await verifyPassword(password, user.password);
                    const createTokens = sign({ nombre }, SECRET_KEY, { expiresIn: '2h' });

                    if (verficatedUser) {
                        res.status(200).json({
                            status:200,
                            userValidate: verficatedUser,
                            token:createTokens,
                            results: results[0]
                        });
                    }else{
                        res.status(401).send({status:401, error: 'Password is incorrect'});
                    }

                } else {
                    console.log('No se encontró ningún usuario con ese correo');
                    res.status(401).json({ status:401, message: 'No se encontró ningún usuario con ese correo'});

                }
            })
            .catch(err => {
                console.error('Error al insertar el usuario:', err);
                res.status(500).json({ status:500, error: 'Error al insertar el usuario en la base de datos' });
            });
    }
    login();
})


module.exports = router;
