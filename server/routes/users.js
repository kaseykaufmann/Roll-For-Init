const router = require("express").Router();
const { authenticateUser, validateLoginForm, validateRegistrationForm } = require("./middleware/userAuthMiddleware");
const user_controller = require('../controllers/user.controller')

//  @route GET /users/
//  @desc Return user list
//  @access Private
// router.get('/', authenticateUser, user_controller.user_list);

//  @route POST /users/register
//  @desc Register user
//  @access Public
router.post("/register", validateRegistrationForm, user_controller.register_user);

// @route POST /users/login
// @desc Login user 
// @access Public
router.post("/login", validateLoginForm, user_controller.login_user)

//  @route GET /users/:userid
//  @desc Return user
//  @access Public
router.get("/:userid", authenticateUser, user_controller.user_detail);

//  @route PUT /users/:userid
//  @desc Update user
//  @access Public
router.put("/:userid", authenticateUser, user_controller.update_user);

//  @route DELETE /users/:userid
//  @desc Delete user
//  @access Public
router.delete("/:userid", authenticateUser, user_controller.delete_user);

module.exports = router;
