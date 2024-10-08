const mysql = require('mysql');

const executeQuery = (query, values) => {
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: 'Servicios_Web'
        });

        connection.connect();

        connection.query(query, values, (err, rows, fields) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });

        connection.end();
    });
};

// Exportar la función con CommonJS
module.exports = { executeQuery };

// Ejemplo de uso (puedes dejarlo o comentarlo si no lo necesitas):
// executeQuery('SELECT 1 + 1 AS solution', [])
//     .then(response => {
//         console.log('The solution is: ', response[0].solution);
//     })
//     .catch(err => {
//         console.error('Error executing query:', err);
//     });
