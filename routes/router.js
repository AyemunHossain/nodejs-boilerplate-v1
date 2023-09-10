const express = require('express');
const router = express.Router();
const { userRegistration, userLogin } = require('../validations/user.model.validation');
const { register, login } = require('../controllers/user.controler');
const validation = require('../middlewares/model-validation');

router.post('/user/register', validation(userRegistration), register);
router.post('/user/login', validation(userLogin), login);


module.exports = router;