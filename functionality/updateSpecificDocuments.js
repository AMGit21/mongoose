const mongoose = require("mongoose");
const dbconnect = require("../dbconnect");
const showErrors = require("./showErrors");

const awaitUpdate = async (model, filter, update, dbUrl) => {
  try {
    // Connect to the database and execute the operations
    await dbconnect(dbUrl); // Connect to the database

    const res = await model.updateMany(filter, update);
    console.log(`Acknowledged: ${res.acknowledged}`);
    console.log(`Matched Count: ${res.matchedCount}`);
    console.log(`Modified Count: ${res.modifiedCount}`);

    if (res.modifiedCount > 0 && res.modifiedCount == res.matchedCount) {
      console.log("Successfully updated");
    } else {
      console.log("No documents were updated");
    }
  } catch (err) {
    showErrors(err);
  } finally {
    mongoose.connection.close(); // Ensure the connection is closed
  }
};

module.exports = awaitUpdate;
