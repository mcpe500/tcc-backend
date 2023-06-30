const Joi = require("joi");
const { enkripsi } = require('../encrypt/encrypt');
const sequelize = require("../database/db");
const { createUser,checkUserExist } = require("../utils/databaseCommands");

module.exports = async function (req, res) {
    let { email, password } = req.body;
    email = email.value;
    password = password.value;
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().min(8).required(),
    });

    const { error } = schema.validate({ email, password });
    if (error) {
        return res.send(error);
    }
    const checkUser = await checkUserExist(email);
    if(checkUser){
        return res.send("Email already exist");
    }
    const encrypted_password = await enkripsi(password);

    const userResult = await createUser(email,encrypted_password);
    
    return res.send(userResult);
}