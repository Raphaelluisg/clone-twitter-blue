const router = require("express").Router();
const userController = require("../controller/user.controller");

router.get('/findall', userController.findAllUserController);
router.get('/findbyemail', userController.findByEmailUserController);

router.post('/create', userController.createUserController);

module.exports = router;