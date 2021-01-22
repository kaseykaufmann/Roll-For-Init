const express = require("express");
const router = express.Router();

// need user model??
//const User = require("../../models/User");

// @route PUT api/users/register
// @desc Register user
// @access Public
router.put("/register", (req, res) => {
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
