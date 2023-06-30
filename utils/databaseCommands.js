const sequelize = require("../database/db");
const User = require("../models/userModels");

module.exports = {
    createUser: async function (email, password) {
        const user = await User.create({
            email,
            password
        });
        return user;
    },
    checkUserExist: async function (email) {
        try {
            // Find a user with the given email
            const user = await User.findAll({ where: { email: email } });

            if (user.length > 0) {
                console.log('User already exists:', user);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error checking user existence:', error);
            throw error;
        }
    }
}