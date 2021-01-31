const router = require('express').Router(),
    validator = require('validator'),
    bcrypt = require('bcrypt'),
    User = require('../models/UserModel.js');


const loginUser = (email, password, done) => {
    const userData = {
        email: email.trim(),
        password: password.trim()
    };
    User.findOne({ email: userData.email }, async (err, user) => {
        if (err) { return done(err); }
        if (!user) {
            const error = new Error('Incorrect email or password');
            error.name = 'IncorrectCredentialsError';
            return done(error);
        }
        bcrypt.compare(password, user.password).then((response) => {
            if (response === false) {
                const error = new Error('Incorrect email or password');
                error.name = 'IncorrectCredentialsError';
                return done(error);
            }
            if (user.email_verified === false) {
                const error = new Error('Email has not been verified');
                error.name = 'UnverifiedEmail';
                return done(error);
            }
            return done(null, user);
        }).catch(error => done(error));
    });
}


const registerUser = async (username, email, password, done) => {
    const userData = {
        email: email.trim(),
        password: password.trim(),
        username: username.trim(),
    };
    const error = new Error('');
    await User.findOne({ email: userData.email }).then((user) => {
        if (user) {
            error.message = 'Email';
        }
    });
    await User.findOne({ username: userData.username }).then((user) => {
        if (user) {
            error.message = error.message + ', Username';
        }
    });
    if (error.message != '') {
        error.name = 'Conflict';
        return done(error);
    }
    try {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const user = new User({
            username: userData.username,
            email: userData.email,
            password: hashedPassword,
        });
        //TODO: Write this function
        // sendAuthenticationEmail(req, user);
        user.save((err) => {
            if (err) {
                return done(err);
            } else {
                return done(null);
            }
        });
    } catch (err) {
        return done(err);
    }
}


const authenticateJwt = (jwt_payload, done) => {
    User.findById(jwt_payload.id).then((user) => {
        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    }).catch((err) => {
        done(err);
    });
}


function validateSignupForm(body) {
    const errors = {};
    let isFormValid = true;
    let message = "";

    if (
        !body ||
        typeof body.email !== "string" ||
        !validator.isEmail(body.email)
    ) {
        isFormValid = false;
        errors.email = "Please provide a correct email address.";
    }

    if (
        !body ||
        typeof body.password !== "string" ||
        body.password.trim().length < 8
    ) {
        isFormValid = false;
        errors.password = "Password must have at least 8 characters.";
    }

    if (
        !body ||
        typeof body.username !== "string" ||
        body.username.trim().length === 0
    ) {
        isFormValid = false;
        errors.username = "Please provide your username.";
    }

    if (!isFormValid) {
        message = "Check the form for errors.";
    }

    return {
        success: isFormValid,
        message,
        errors,
    };
}

//TODO: Determine is this is best practice
const isAuthenticated = (req) => {
    if (req.user) {
        return true
    } else {
        return false
    }
}


//Handles signup
const registerHandler = (req, res, next) => {
    // Verify that user is not signed into an account already
    if (isAuthenticated(req)) {
        return res.status(401).json({
            success: false,
            message: "Please log out to register a new account.",
            errors: { auth: "Cannot register account while logged in." }
        });
    }
    body = req.body
    // Validate the sign up information
    const validationResult = validateSignupForm(body);
    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors,
        });
    }
    username, email, password = { body }
    return registerUser(username, email, password, (err) => {
        if (err) {
            if (err.name === "Conflict") {
                // the 11000 Mongo code is for a duplication email error
                // the 409 HTTP status code is for conflict error
                const errors = {};
                if (err.message.includes("Email")) {
                    errors.email = "This email is already taken.";
                }
                if (err.message.includes("Username")) {
                    errors.username = "This username is already taken.";
                }
                return res.status(409).json({
                    success: false,
                    message: "Check the form for errors.",
                    errors: errors,
                });
            }
            return res.status(400).json({
                success: false,
                message: "Could not process the form.",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Account registered successfully.",
        });
    })(req, res, next);
};


function validateLoginForm(body) {
    const errors = {};
    let isFormValid = true;
    let message = "";

    if (
        !body ||
        typeof body.email !== "string" ||
        body.email.trim().length === 0
    ) {
        isFormValid = false;
        errors.email = "Please provide your email address.";
    }

    if (
        !body ||
        typeof body.password !== "string" ||
        body.password.trim().length === 0
    ) {
        isFormValid = false;
        errors.password = "Please provide your password.";
    }

    if (!isFormValid) {
        message = "Check the form for errors.";
    }

    return {
        success: isFormValid,
        message,
        errors,
    };
}

const loginHandler = (req, res, next) => {
    const validationResult = validateLoginForm(req.body);
    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors,
        });
    }
    return loginUser(email, password, (err, user) => {
        if (err) {
            if (err.name === "IncorrectCredentialsError") {
                return res.status(400).json({
                    success: false,
                    name: err.name,
                    message: err.message,
                });
            } else if (err.name === "UnverifiedEmail") {
                return res.status(400).json({
                    success: false,
                    name: err.name,
                    message: err.message,
                });
            } else {
                return res.status(400).json({
                    success: false,
                    name: err.name,
                    message: "Could not process the form.",
                });
            }
        }
        //TODO: Session handling
        // req.logIn(user, () => {
        //     const token = jwt.sign({ id: user.id }, config.secret, {
        //         expiresIn: 60 * 60 * 24 * 1,
        //     });
        //     return res.json({
        //         auth: true,
        //         success: true,
        //         message: "You have successfully logged in!",
        //         token,
        //     });
        // });
    })(req, res, next);
};

const authenticationHandler = (req, res, next) => {
    jwt = {}
    authenticateJwt(jwt, (err, user) => {
        if (err) {
            return res.status(401).json({ message: "Could not authenticate user." });
        } else {
            req.user = user;
            next();
        }
    })
}

//Signup
router.post("/register", registerHandler);

//Login
router.post("/login", loginHandler);

//Authed users may access the API
router.use("/", authenticationHandler);

module.exports = router;