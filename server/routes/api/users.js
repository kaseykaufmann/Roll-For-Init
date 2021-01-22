const express = require("express");
const router = express.Router();

//const User = require("../../models/User");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  res.send("hi /register");
});

// @route PUT api/users/login
// @desc Login user 
// @access Public
router.put("/login", (req, res) => {
  res.send("hi /login");
});

// @route GET api/users/login
// @desc Return username 
// @access Public
router.get("/login/:userid", (req, res) => {
  res.send("hi /login/:userid " + req.params.userid);
});

module.exports = router;
