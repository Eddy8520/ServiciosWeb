const bcrypt = require('bcrypt');


const verifyPassword = async (plainPassword, hashedPassword) => {
    try {
        const match = await bcrypt.compare(plainPassword, hashedPassword);
        return match; // Devuelve true si coinciden, false si no
    } catch (error) {
        throw error;
    }
};

module.exports = {verifyPassword};
