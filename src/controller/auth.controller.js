const authService = require("../service/auth.service");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const loginController = async (req, res) => {
    const user = await authService.loginService(req.body.email);

    if (!user) {
        return res.status(400).send({ message: "User not found" });
    }

    if (! await bcrypt.compare(req.body.password, user.password)) {
        return res.status(400).send({ message: "Invalid Password!" });
    }
    
    delete user.password;

    const token = authService.generateToken(user.id);

    res.status(201).send({
        user,
        token,
    });
};

module.exports = { loginController };