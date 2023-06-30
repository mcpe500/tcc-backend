const Joi = require("joi");
const sequelize = require("../database/db");
const jwt = require('jsonwebtoken');
const env = require("../config/env.json");
const { check } = require("../encrypt/encrypt");
const User = require("../models/userModels");
const JWT_SECRET = env.JWT_SECRET;


module.exports = async function (req, res) {
    console.log(req.body)
    let { email, password } = req.body;
    email = email.value;
    password = password.value;
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().min(8).required(),
    });
    console.log("username:pass: ", email, password);
    const { error } = schema.validate({ email, password });
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    try {
        const userResult = await User.findOne({
            where: { email }
        });
        const user = userResult.dataValues;
        console.log(user);
        if (user) {
            let isPasswordMatch = await check(password, user.password);
            if (isPasswordMatch) {
                const token = jwt.sign(user, JWT_SECRET, {
                    expiresIn: '1h'
                })
                return res.send({
                    token,
                    role: 1
                });
            }
        }
        console.log(user);
        res.send(user);
        // if (teachers) {
        //     let isPasswordMatch = await check(password, teachers.password);
        //     if (isPasswordMatch) {
        //         const token = jwt.sign(teachers, JWT_SECRET, {
        //             expiresIn: '1h'
        //         })
        //         return res.send({
        //             token,
        //             role: 1
        //         });
        //     }
        // }
        // console.log(username, password);
        // const queryTeachers = 'SELECT * FROM teachers WHERE (username = ? or email = ?)';
        // const [teachers, teachersMetadata] = await sequelize.query(queryTeachers, {
        //     replacements: [username, username],
        //     type: sequelize.QueryTypes.SELECT,
        // });
        // if (teachers) {
        //     let isPasswordMatch = await check(password, teachers.password);
        //     if (isPasswordMatch) {
        //         const token = jwt.sign(teachers, JWT_SECRET, {
        //             expiresIn: '1h'
        //         })
        //         return res.send({
        //             token,
        //             role: 1
        //         });
        //     }
        // }
        // const queryStudents = 'SELECT * FROM students WHERE (username = ? or email = ?)';
        // let [students, studentsMetadata] = await sequelize.query(queryStudents, {
        //     replacements: [username, username],
        //     type: sequelize.QueryTypes.SELECT,
        // });
        // if (students) {
        //     isPasswordMatch = await check(password, students.password);
        //     if (isPasswordMatch) {
        //         const token = jwt.sign(students, JWT_SECRET, {
        //             expiresIn: '1h'
        //         })
        //         return res.send({
        //             token,
        //             role: 1
        //         });
        //     }
        // }
        // return res.status(400).send({
        //     error: "Username or password is wrong",
        //     role: -1
        // });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};
