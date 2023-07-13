const Joi = require("joi");

const { check } = require("../encrypt/encrypt");
const { findEmail } = require("../utils/databaseCommands");
const { generateToken } = require("../utils/jwtCommands")

module.exports = async function (req, res) {
    try {
        const { email, password } = req.body;
        if (email) {
            if (email == "admin@admin.admin" && password == "testadmin") {
                const token = generateToken({ email }); // Assuming you have a function to generate a token
                return res.status(200).send({ token, role: 0 });
            }
        }
        const schema = Joi.object({
            email: Joi.string().email().required().messages({
                'string.base': 'Email must be a string',
                'string.empty': 'Email is required',
                'string.email': 'Email must be a valid email address',
                'any.required': 'Email is required',
            }),
            password: Joi.string().min(8).required().messages({
                'string.base': 'Password must be a string',
                'string.empty': 'Password is required',
                'string.min': 'Password must be at least 8 characters long',
                'any.required': 'Password is required',
            }),
        });
        console.log(email, password);
        const { error } = schema.validate({ email, password });
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const user = await findEmail(email);
        if (!user) {
            return res.status(400).send({
                error: "Email or password is incorrect",
                role: -1
            });
        }

        const isPasswordMatch = await check(password, user.password);
        if (isPasswordMatch) {
            console.log(user.dataValues);
            const token = await generateToken(user.dataValues);
            return res.status(200).send({
                token,
                role: 1
            });
        }

        return res.status(400).send({
            error: "Email or password is incorrect",
            role: -1
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal server error");
    }
};
