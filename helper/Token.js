const jwt = require('jsonwebtoken');

const SECRET_KEY = '#Admin123';

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Obtener el token de la cabecera

    if (!token) {
        return res.status(403).json({ error: 'Token no proporcionado' });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token inválido' });
        }
        req.user = decoded; // Guardar los datos del usuario en la solicitud
        next();
    });
};

module.exports = {verifyToken};
