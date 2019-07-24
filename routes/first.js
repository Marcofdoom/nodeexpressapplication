const express = require("express");
const router = express.Router();

const _ = require("lodash");

let myArray = [];

router.post("/populate", (req, res) => {
    let item = req.body.item;
    let name = req.body.name;
    let object = objectMaker(name, item);

    myArray.push(object);
    res.send("Object added to array");
});

router.get("/getArray", (req, res) => {
    res.send(myArray);
});

router.put("/updateFirst", (req, res) => {
    let updateItem = req.body.item;
    let updateName = req.body.name;

    _.set(myArray, '[0].objectText', updateItem);
    _.set(myArray, '[0].objectName', updateName);
    res.send("first item updated");
});

router.delete("/delete", (req, res) => {
    _.pullAt(myArray, 0);
    res.send("First item deleted");
});

function objectMaker(name, text) {
    const object = {
        objectName: name,
        objectText: text
    }

    return object;
}

module.exports = router;