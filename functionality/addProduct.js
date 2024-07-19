const mongoose = require("mongoose");
const dbconnect = require("../dbconnect");
const productModel = require("../models/product");
const showErrors = require("./showErrors");

const product = new productModel({
  ID: 1,
  Name: "pepsi", // process.argv[2] is the third element when running "node .\app.js [product_name]"
  Description: "mashroubet",
  ExpireDate: "2023-08-09", // Example of accessing the data from another place
  Price: 25,
});

const addProduct = async () => {
  try {
    await product.save();
    console.log("Product Added!");
  } catch (error) {
    showErrors(error); // Call function from ./showErrors.js
  }
};
const deleteProduct = async () => {
  try {
    const result = await productModel.deleteMany({ Price: { $gte: 20 } });
    console.log(`${result.deletedCount} documents deleted.`);
  } catch (error) {
    console.log(error);
  }
};
const displayProducts = async () => {
  try {
    const result = await productModel.find({});
    console.log(result);
  } catch (error) {
    console.log(error); // Call function from ./showErrors.js
  }
};

// Connect to the database and execute the operations
const url = "mongodb://127.0.0.1:27017/new_db";
dbconnect(url).then(async () => {
  await addProduct();
  await deleteProduct();
  await displayProducts();
  mongoose.connection.close();
});
