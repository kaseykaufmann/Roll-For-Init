const router = require("express").Router();
const User = require("../models/User.js");

router.get("/", (req, res, next) => {
  if (req.query.id) {
    User.findById(req.query.id, (err, user) => {
      if (err) return next(err);
      res.json(user);
    });
  } else if (req.query.username) {
    User.find(
      {
        username: req.query.username,
      },
      (err, user) => {
        if (err) return next(err);
        res.json(user);
      }
    );
  } else {
    if (req.user) {
      User.findById(
        req.user.id,
        "username email"
      ).exec((err, user) => {
        if (err) return next(err);
        res.status(200).send(user);
      });
    } else {
      res.status(400).json({ message: "Not logged in." });
    }
  }
});

router.post("/", (req, res, next) => {
  User.create(req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.put("/:id", (req, res, next) => {
  if (
    req.user.id === req.params.id ||
    req.user.status === 0 ||
    req.user.status === 0
  ) {
    User.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
      if (err) return next(err);
      res.json(post);
    });
  }
});

router.delete("/:id", (req, res, next) => {
  if (req.user.status === 1) {
    User.findById(req.params.id).then((user) => {
      if (user.status == 0 || user.status == 1) {
        res.status(401).send({ message: "Unauthorized action" });
      } else {
        User.findByIdAndRemove(req.params.id, req.body, (err, post) => {
          if (err) return next(err);
          res.json(post);
        });
      }
    });
  } else if (req.user.status === 0) {
    User.findByIdAndRemove(req.params.id, req.body, (err, post) => {
      if (err) return next(err);
      res.json(post);
    });
  } else {
    res.status(401).send({ message: "Unauthorized action" });
  }
});

module.exports = router;