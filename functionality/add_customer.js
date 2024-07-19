const mongoose = require("mongoose");
const dbconnect = require("../dbconnect");
const personModel = require("../models/person");
const productModel = require("../models/product");
const customerModel = require("../models/customer");

const addDocuments = async () => {
  try {
    // Create a person
    const person = new personModel({
      Fname: "ali",
      Lname: "abc",
      gender: "male",
      Age: 40,
      Married: true,
    });

    // Save the person
    await person.save();
    console.log(person.Fname, person.Lname, "Added!");

    // Create multiple products
    const products = await productModel.create([
      {
        ID: 100,
        Name: "Monitor 17",
        Description: "Intel",
        ExpireDate: new Date("2027-11-06"),
        Price: 25,
      },
      {
        ID: 101,
        Name: "Keyboard",
        Description: "Mechanical keyboard",
        ExpireDate: new Date("2026-12-31"),
        Price: 50,
      },
    ]);
    console.log("Products Added!");
    console.log("Created Products:", products);

    // Extract product IDs
    const productsIds = products.map((product) => product._id);
    console.log("Products IDs:", productsIds);

    // Ensure a fresh Customer document
    // await customerModel.deleteMany({ ID: 1 }); // Remove any existing customers with ID 1

    // Create a new customer with reference to the person and products
    const customer = new customerModel({
      ID: 1,
      Person: person,
      Products: productsIds, // Use array of product ids
    });

    // Save the customer
    await customer.save();
    console.log("Customer Added!");

    // Verify saved customer document
    const savedCustomer = await customerModel.findOne({ ID: 1 });
    console.log(`Saved Customer (before populate): ${savedCustomer}`);

    // Populate Products in Customer and display
    const populatedCustomer = await customerModel
      .findOne({ ID: 1 })
      .populate("Products")
      .exec();
    console.log(`Customer info (after populate): ${populatedCustomer}`);
  } catch (error) {
    console.error("Error:", error);
  }
};

// Connect to the database and execute the operations
const url = "mongodb://127.0.0.1:27017/new_db";
dbconnect(url)
  .then(async () => {
    await addDocuments();
  })
  .catch((error) => console.error("Connection error:", error))
  .finally(() => mongoose.connection.close());
