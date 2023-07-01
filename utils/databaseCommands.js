const sequelize = require("../database/db");
const User = require("../models/userModels");

module.exports = {
    createUser: async function (username, email, password) {
        const user = await User.create({
            username,
            email,
            password
        });
        return user;
    },
    checkUserExist: async function (email) {
        try {
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
    },
    findEmail: async function (email) {
        try {
            const user = await User.findAll({ where: { email: email } });
            if (user.length > 0) {
                return user[0];
            }
        } catch (error) {
            console.error('Error checking user existence:', error);
            throw error;
        }
    }
}