const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const personModel = require("./person"); // Importing the entire model, not just the schema

const customerSchema = new Schema(
  {
    ID: {
      type: Number,
    },
    Person: personModel.schema, // Using personModel.schema to embed the person schema
    Products: [
      {
        type: Schema.Types.ObjectId, // _id
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

const customerModel = mongoose.model("Customer", customerSchema); // customers
module.exports = customerModel;
