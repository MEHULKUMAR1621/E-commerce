const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
const cors = require('cors');
const mongoose = require("mongoose");
const session = require('express-session');
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/order");

const app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept,Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});

app.options('*', cors())

app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/order", orderRoutes);

module.exports = app;