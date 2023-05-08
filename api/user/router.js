const router = require('express').Router();

const authMiddleware = require('../../middlewares/auth');

const logout = require('./logout');
const login = require('./login');
const register = require('./register');
const verify = require('./verify');
const getUserInfo = require('./getUserInfo');
const changeName = require('./changeName');
const changeIcon = require('./changeIcon');
const changeEmail = require('./changeEmail');
const verifyChangeEmail = require('./verifyChangeEmail');
const deleteAccount = require('./deleteAccount');



router.post('/login', login);
router.post('/register', register);
router.delete('/deleteAccount', authMiddleware, deleteAccount)
router.put('/verifyChangeEmail', authMiddleware, verifyChangeEmail);
router.post('/verify', verify);
router.get('/getUserInfo', authMiddleware, getUserInfo);
router.post('/logout', authMiddleware, logout);
router.put('/changeName', authMiddleware, changeName);
router.put('/changeIcon', authMiddleware, changeIcon);
router.put('/changeEmail', authMiddleware, changeEmail)


module.exports = router;
