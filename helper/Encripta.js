const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
    const saltRounds = 10; // Puedes ajustar el número de rondas
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        throw error;
    }
};

module.exports = { hashPassword };
