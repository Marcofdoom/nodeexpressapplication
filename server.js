const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const first = require("./routes/first.js");

const app = express();

mongoose.connect('mongodb://localhost:27017/example', { useNewUrlParser: true }).then(
    () => { console.log("connection ready") },
    (err) => { console.log(err) });

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Using the routes
app.use("/first", first);

// Use default 5000 port
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));