const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const User = require("../models/User.js");

// Display list of all users.
const user_list = (req, res) => {
    res.send('NOT IMPLEMENTED: user list');
}

// Display detail page for a specific user.
const user_detail = (req, res, next) => {
    //probably most useful when introing party func with a "public facing" profile
    //possible streamlining...no search by userid, just unique username. only for seeing page after already logging in or for seeing other users
    User.find(
        {
            username: req.params.userid
        },
        (err, user) => {
            if (err) return next(err);

            if (res.locals.auth && res.locals.auth.username == req.params.userid) return res.status(200).json(user.private);
            return res.status(400).json(user.public);
        })

    // if (req.query.id) {
    //     User.findById(req.query.id, (err, user) => {
    //         if (err) return next(err);
    //         res.json(user);
    //     });
    // } else if (req.query.username) {
    //     User.find(
    //         {
    //             username: req.query.username,
    //         },
    //         (err, user) => {
    //             if (err) return next(err);
    //             res.json(user);
    //         }
    //     );
    // } else {
    //     if (res.locals.auth) {
    //         User.findById(
    //             req.user.id,
    //             "username email"
    //         ).exec((err, user) => {
    //             if (err) return next(err);
    //             res.status(200).send(user);
    //         });
    //     } else {
    //         res.status(400).json({ message: "Not logged in." });
    //     }
    // }
}

const delete_user = (req, res, next) => {
    console.log(req.params.userid);
    //you can only delete a user if you yourself are the user
    //this may be better as req.query.id rather than just a url parameter
    if (res.locals.auth.username === req.params.userid) {
        User.findOneAndDelete(req.params.userid, (err, post) => {
            if (err) return next(err);
            return res.status(200).json(post);
        })
    }
    return res.status(401).send({ message: "Unauthorized action" });
}

const update_user = (req, res, next) => {
    if (
        res.locals.auth.username === req.params.userid //this may be better as req.query.id rather than just a url parameter
    ) {
        if (req.body.password) {
            bcrypt.hash(req.body.password, 10, (error, hash) => {
                if (error) return res.status(500).send('hashing error');
                console.log(hash);
                req.body.password = hash;
                User.findOneAndUpdate(req.params.userid, req.body, (err, post) => {
                    if (err) return next(err);
                    res.json(post);
                });
            });
        }
        else {
            User.findOneAndUpdate(req.params.userid, req.body, (err, post) => {
                if (err) return next(err);
                res.json(post);
            });
        }
        //logs you out
        return res.clearCookie('auth');
    }
    else return res.status(401).send({ message: "Unauthorized action" });
}

const register_user = (req, res, next) => {
    //will probably want some kind of sanitizer for user input
    console.log(req.body);
    bcrypt.hash(req.body.password, 10, (error, hash) => {
        if (error) return res.status(500).send('hashing error');
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
        });
        //TODO: Write this function
        // sendAuthenticationEmail(req, user);
        User.create(user, (err, post) => {
            if (err) return next(err);
            return res.status(200).json(post);
        });
    })
}

const login_user = (req, res) => {
    //if you have the jwt don't even go to login
    User.findOne({ email: req.body.email }, async (err, user) => {
        if (err) { return res.status(500).send(err); }
        if (!user) {
            const error = new Error('Incorrect email or password');
            error.name = 'IncorrectCredentialsError';
            console.log(user);
            return res.status(401).send(error);
        }
        bcrypt.compare(req.body.password, user.password).then((response) => {
            console.log(req.body.password);
            if (response === false) {
                const error = new Error('Incorrect email or password');
                error.name = 'IncorrectCredentialsError';
                return res.status(401).send(error);
            }

            jwt.sign({ username: user.username }, process.env.JWT_SECRET, (error, token) => {
                console.log(user.username);
                if (error) {
                    console.log(error);
                    return res.status(500).send(error);
                }
                res.status(200).cookie('auth', token,
                    { maxAge: 360000, httpOnly: false })
                    .send("Authentication cookie set."); //MAY REQUIRE cors package with use with fetch()...CHECK!
            });

            /*
            TODO: EMAIL VERIFICATION
            if (user.email_verified === false) {
                const error = new Error('Email has not been verified');
                error.name = 'UnverifiedEmail';
                return done(error);
            }
            */
            return user;
        }).catch(error => res.status(500).send(error));
    });
}

module.exports = { user_list, user_detail, delete_user, update_user, register_user, login_user }