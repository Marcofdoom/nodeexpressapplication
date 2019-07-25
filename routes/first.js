const express = require("express");
const router = express.Router();

const _ = require("lodash");
const UserModel = require("../models/itemsmodel.js");
const userNameValidator = require("../validators/usernameValidator.js");
const bcrypt = require("bcrypt");

// @route   POST first/post
// @desc    Post user
// @access  Public
router.post("/create", (req, res) => {

    const response = userNameValidator.validateLoginInput(req.body);

    if (response.isValid) {

        const payload = {};

        // HASH PASSWORD
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.email, salt, (err, hash) => {

                payload.value = hash;

                const user = new UserModel({
                    "username": req.body.username,
                    "email": hash,
                    "password": req.body.password
                });

                user.save().then(() => res.send("User Saved")).catch((err) => res.send(err));
            })
        });

    } else {
        res.status(404).json(response.errors);
    }
});

// @route   DELETE first/delete
// @desc    Delete product
// @access  Public
router.delete("/deleteOne", (req, res) => {
    UserModel.deleteOne({ username: req.body.username }).then(
        ({ ok, n }) => res.send(`${n} record(s) deleted`))
        .catch(err => res.status(404).json({ noItems: "There are no items" }));
});

// @route   DELETE first/delete
// @desc    Delete product
// @access  Public
router.delete("/deleteMany", (req, res) => {
    UserModel.deleteMany({ content: req.body.content }).then(
        ({ ok, n }) => res.send(`${n} record(s) deleted`),
        (err) => res.send(err))
        .catch(err => res.status(404).json({ noItems: "There are no items" }));
});

// @route   POST first/get
// @desc    Get one user
// @access  Public
router.post("/get", (req, res) => {
    const usernameBody = req.body.username;
    const emailBody = req.body.email;
    let hashedEmail;
    let item;

    UserModel.findOne({ username: usernameBody }).then((item) => {
        hashedEmail = item.email;
        item = item;

        bcrypt
            .compare(emailBody, hashedEmail)
            .then(isMatch => {
                if (isMatch) {
                    res.send(item);
                } else {
                    res.send("error");
                }
            }).catch(err => res.status(404).send(err));
    });
});

// @route   DELETE first/delete
// @desc    Delete product
// @access  Public
router.delete("/deleteOne", (req, res) => {
    // UserModel.deleteOne({ username: req.body.username }).then(
    //     ({ ok, n }) => res.send(`${n} record(s) deleted`))
    //     .catch(err => res.status(404).json({ noItems: "There are no items" }));

    // TEST
    const usernameBody = req.body.username;
    const emailBody = req.body.email;
    let hashedEmail;
    let item;

    bcrypt
        .compare(emailBody, hashedEmail)
        .then(isMatch => {
            if (isMatch) {
                UserModel.deleteOne({ username: usernameBody }).then((item) => {
                    hashedEmail = item.email;
                    item = item;
                });
            } else {
                res.send("error");
            }
        }).catch(err => res.status(404).send(err));


});

// @route   GET first/getAll
// @desc    Get all users
// @access  Public
router.get("/getAll", (req, res) => {
    const errors = {};
    UserModel.find().then(items => {
        if (!items) {
            errors.noItems = "There are no items";
            res.status(404).json(errors);
        }
        res.json(items);
    }).catch(err => res.status(404).json({ noItems: "There are no items" }));
});

// @route   PUT first/update
// @desc    updates email
// @access  Public
router.put("/update", (req, res) => {
    UserModel.updateOne(
        { email: req.body.email },
        { $set: { "email": "John", "password": "2" } }).then(
        () => res.send("Updated"),
        (err) => res.send(err))
});

function objectMaker(email, password) {
    const object = {
        objectEmail: email,
        objectPassword: password
    }

    return object;
}

module.exports = router;