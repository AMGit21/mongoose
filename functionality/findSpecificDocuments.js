const mongoose = require("mongoose");
const dbconnect = require("../dbconnect");
const personModel = require("../models/person");
const productModel = require("../models/product");
const customerModel = require("../models/customer");

// Function to get specific documents from a model based on a filter
const getSpecificDocuments = async (model, filter) => {
  try {
    const result = await model.find(filter);
    // const result = await personModel.find({});
    // const result = await productModel.find({});
    // console.log(result);
    result.forEach((document) => console.log(document));
    return result;
  } catch (error) {
    console.error("Error fetching documents:", error);
  }
};

// Define filters for Person and Product models
const filterPerson = { Lname: "bbb", Age: { $lte: 42 } };
const filterProduct = { Price: { $gt: 30 } };
const filterCustomer = { "Person.Fname": "ali" };

// Main function to execute the dynamic searches
const main = async () => {
  const url = "mongodb://127.0.0.1:27017/new_db";
  await dbconnect(url);

  await getSpecificDocuments(personModel, filterPerson);
  await getSpecificDocuments(productModel, filterProduct);
  await getSpecificDocuments(customerModel, filterCustomer);

  mongoose.connection.close();
};

// Execute the main function
main().catch((error) => console.error("Main function error:", error));

// Export the getSpecificDocuments function for external use
module.exports = getSpecificDocuments;
