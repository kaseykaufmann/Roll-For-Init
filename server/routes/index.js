const router = require('express').Router();

router.use('/users', require('./users.js'));

router.all('*', (req, res) => {
    res.status(404).send("Unknown route.")
})

module.exports = router;
