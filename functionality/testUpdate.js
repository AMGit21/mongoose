const awaitUpdate = require("./updateSpecificDocuments.js");
// Example filter and update
const productModel = require("../models/product.js");

const filter = { Name: "Monitor 17" };
const update = { Name: "Monitor 20", Price: 35 };

const url = "mongodb://127.0.0.1:27017/new_db";
// Execute the update
awaitUpdate(productModel, filter, update, url);
