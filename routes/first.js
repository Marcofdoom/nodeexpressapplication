const express = require("express");
const router = express.Router();

const _ = require("lodash");
const UserModel = require("../models/itemsmodel.js");
const userNameValidator = require("../validators/usernameValidator.js");

// @route   POST first/post
// @desc    Post user
// @access  Public
router.post("/create", (req, res) => {

    const response = userNameValidator.validateLoginInput(req.body);

    if (response.isValid) {
        const user = new UserModel({
            "email": req.body.email,
            "password": req.body.password
        });
        
        user.save().then(() => res.send("User Saved")).catch((err) => res.send(err));

    } else {
        res.status(404).json(response.errors);
    }
});

router.delete("/delete", (req, res) => {
    UserModel.deleteOne({ email: req.body.email }).then(
        ({ ok, n }) => res.send(`${n} record(s) deleted`))
        .catch(err => res.status(404).json({ noItems: "There are no items" }));
});

// @route   DELETE first/delete
// @desc    Delete product
// @access  Public
router.delete("/delete", (req, res) => {
    UserModel.deleteMany({ email: req.body.email }).then(
        ({ ok, n }) => res.send(`${n} record(s) deleted`),
        (err) => res.send(err))
        .catch(err => res.status(404).json({ noItems: "There are no items" }));
});

// @route   GET first/getAll
// @desc    Get all products
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