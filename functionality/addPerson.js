const mongoose = require("mongoose");
const dbconnect = require("../dbconnect");
const personModel = require("../models/person");
const showErrors = require("./showErrors");

const person = new personModel({
  Fname: "Batoul",
  Lname: "aaa",
  gender: "female",
  Age: 35,
  Married: true,
  abc: "lol",
  mar: false,
});

const addPerson = async () => {
  try {
    await person.save();
    console.log("Person Added!");
  } catch (error) {
    showErrors(error); // Call function from ./showErrors.js
  }
};
// const deletePerson = async () => {
//   try {
//     await personModel.deleteMany({ Age: { $gte: 30 } });
//     console.log("Person deleted!");
//   } catch (error) {
//     console.log(error);
//   }
// };
// --------------------
const deleteDocuments = async (model, filter) => {
  try {
    const result = await model.deleteMany(filter);
    console.log(`${result.deletedCount} documents deleted.`);
  } catch (error) {
    console.error("Error deleting documents:", error);
  }
};

// Example filter
const filter = { Age: { $gte: 30 } };

// --------------------

const displayPersons = async () => {
  try {
    const result = await personModel.find({});
    console.log(result);
  } catch (error) {
    showErrors(error); // Call function from ./showErrors.js
  }
};

// Connect to the database and execute the operations
const url = "mongodb://127.0.0.1:27017/new_db";
dbconnect(url).then(async () => {
  await addPerson();
  // Delete documents that match the filter
  await deleteDocuments(personModel, filter);
  await displayPersons();
  // await deletePerson();
  mongoose.connection.close();
});
