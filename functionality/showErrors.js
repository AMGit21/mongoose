// This function "showErrors(error)" displays all the errors
const showErrors = (error) => {
  console.log("--------------------------------------------------------");
  console.log("Error Occurred:");

  if (error.errors && typeof error.errors === "object") {
    // Handling Mongoose validation errors
    const keyErrors = Object.keys(error.errors);
    console.log("Validation Errors:", keyErrors.join(", "));
    console.log("Message:", error._message);
    console.log(
      "--------------------------------------------------------\nDetails:"
    );
    keyErrors.forEach((e) =>
      console.log(`- ${error.errors[e].properties.message}`)
    );
  } else {
    // Handling other types of errors
    console.log("Name:", error.name);
    console.log("Message:", error.message);

    if (error.stack) {
      console.log("Stack Trace:");
      console.log(error.stack);
    }
  }

  console.log("--------------------------------------------------------");
};

module.exports = showErrors;
