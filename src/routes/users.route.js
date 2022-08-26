const router = require("express").Router();
const userController = require("../controller/user.controller");

router.get('/', userController.findAllUserController);
router.get('/findbyemail', userController.findByEmailUserController);

router.post('/', userController.createUserController);

module.exports = router;