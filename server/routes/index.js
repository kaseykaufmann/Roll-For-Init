const router = require('express').Router();

//router.use('/', require('./auth.js')); //i do not think this is necessary atm

router.use('/users', require('./users.js'));

module.exports = router;
