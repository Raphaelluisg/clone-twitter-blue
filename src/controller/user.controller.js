const userService = require("../service/users.service");

const findByEmailUserController = async (req, res) => {
    const user = await userService.findByEmailUserService(req.body.email);

    if (!user) {
        return res.status(404).send({ message:"User not found!" });
    }
    res.status(200).send(user);
}

const createUserController = async (req, res) => {
    if (!req.body.username || !req.body.name || !req.body.email || !req.body.password || !req.body.avatar) {
        return res.status(400).send({
            message:
                "Some fields are missing or invalid. The valid fields are: 'username', 'name', 'email', 'password', and 'avatar'"
        });
    }

    const foundUser = await userService.findByEmailUserService(req.body.email);

    if (foundUser) {
        return res.status(400).send({
            message: " User already in use!",
        });
    }

    const user = await userService
    .createUserService(req.body)
    .catch((err) => console.log(err, message));

    if (!user) {
        return res.status(400).send({
            message: "Failed to create user",
        });
    }

    res.status(201).send(user);
};

const findAllUserController = async (req, res) => {
    const users = await userService.findAllUserService();

    if (users.length === 0) {
        return res.status(400).send({ 
            message: "User not registered!",
        });
    }

    res.send(users);
};


module.exports = { createUserController, findByEmailUserController, findAllUserController };