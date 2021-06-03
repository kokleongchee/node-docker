const User = require("../models/userModel")
const bcrypt = require("bcryptjs")

exports.signUp = async (req, res) => {
    try {
        const {username, password} = req.body
        const hashpassword = await bcrypt.hash(password, 12)

        const newUser = await User.create({
            username,
            password: hashpassword
        })
        req.session.user = newUser
        res.status(201).json({
            status: "Success",
            data: {
                user: newUser,
            }
        })
    } catch (e) {
        console.log (e)
        res.status(400).json ({
            status: "Fail",
        })
    }
}

exports.login = async (req, res) => {
    try {
        const {username, password} = req.body

        const user = await User.findOne({username})

        if (!user) {
            return res.status(404).json({
                status: "Fail",
                message: "User not found"
            })
        }

        const isCorrect = await bcrypt.compare(password, user.password)
        if (isCorrect) {
            req.session.user = user
            res.status(200).json({
                status: "Success"
            })
        } else {
            res.status(400).json ({
                status: "Fail",
                messsage: "Incorrect user name or password"
            })
        }
    } catch (e) {
        console.log (e)
        res.status(400).json ({
            status: "Fail"
        })
    }
}