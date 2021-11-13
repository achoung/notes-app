const router = require('express').Router();
const auth = require('./../middleware/auth');
const userController = require('./../controllers/userController');

router.post('/create', userController.createUser);
router.post('/login', userController.loginUser);
router.post('/logout', auth, userController.logoutUser);
router.get('/isLoggedIn', auth, userController.isLoggedIn);

module.exports = router;
