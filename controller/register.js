const Joi = require("joi");
const { enkripsi } = require('../encrypt/encrypt');
const { createUser, checkUserExist } = require("../utils/databaseCommands");

module.exports = async function (req, res) {
    console.log(req.body)
    let { username, email, password } = req.body;
    // email = email.value;
    // password = password.value;
    const schema = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().min(8).required(),
    });

    const { error } = schema.validate({ username, email, password });
    if (error) {
        return res.send(error);
    }
    const checkUser = await checkUserExist(email);
    if (checkUser) {
        return res.send("Email already exist");
    }
    const encrypted_password = await enkripsi(password);

    const userResult = await createUser(username, email, encrypted_password);
    console.log(userResult);
    return res.send(userResult);
}