const router = require('express').Router();

router.use('/', require('./auth.js'));

router.use('/user', require('./user.js'));

module.exports = router;