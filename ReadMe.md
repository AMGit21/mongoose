https://www.guru99.com/installation-configuration-mongodb.html

# On mongo.exe: All of these code will be run in the MongoDB JavaScript command shell.

# Import

mongoimport --db TestDB --type csv --headerline --file data.csv
mongoimport --db TestDB --type csv --headerline --file "C:\\ ... path ... \\data.csv"

# Export

mongoexport --db TestDB --collection data --type csv --fields Employeeid,EmployeeName --out exported_data.csv

# For configuration

https://docs.mongodb.com/manual/reference/configuration-options/
mongod --config "C:/ ... path ... /mongod.conf"

# Create a database using "use" command

use testDB

# Create a collection by insert

Add a new collections under the testDB database
db.collection_name.insert({"id":1, "name":"ali", "age":15})
db.new_collection_name.insert({"sub_id":1, "subject":"MongoDB", "grade":16})

# Use the insert command to insert the array of documents into the collection

var myEmployee = [
{ "_id" : 11, "name" : "Smith", "age":14 },
{ "id" : 12, "name" : "Mohan", "age":17 },
{ "id" : 13, "name" : "Joe", "age":16 }
];
db.collection_name.insert(myEmployee);

# To display each document in the collection in JSON format

db.collection_name.find().forEach(printjson)

# To display the documents of a collection

db.collection_name.find()

# MongoDB query examples

db.collection_name.find({name : "ali"}).forEach(printjson); # Here we want to find for an Employee whose name is “ali” in the collection , hence we enter the filter criteria as EmployeeName : “ali”
db.collection_name.find({age : {$gt:18}}).forEach(printjson); # Here we want to find for all Employee’s whose age is greater than 18. The $gt is called a query selection operator, and what is just means is to use the greater than expression.

#

var std_age = db.collection_name.find( { age : { $gt:2 } } );
while(std_age.hasNext()) { print(tojson(std_age.next())); }

# Code Explanation:

First we take the result set of the query which finds the students’s whose age is greater than 2 and assign it to the JavaScript variable ‘std-age’
Next we use the while loop to iterate through all of the documents which are returned as part of the query.
Finally for each document, we print the details of that document in JSON readable format.

#

# Sort() & Limit() Query

db.collection_name.find({age : {$gt:2}}).limit(2).forEach(printjson);
db.collection_name.find().sort({age:-1}).forEach(printjson); # Here the -1 indicates that we want to return the documents based on the descending order of Employee age. # Ascending order is defined by value 1.

# Count() & Remove() Functions

db.collection_name.count()
db.collection_name.find({age:{$gt:14}}).count()
db.collection_name.remove({})
db.collection_name.remove({age:17})

# MongoDB Update() Document

db.collection_name.update( {id:2}, { $set: {"name":"hossam"} } );
db.collection_name.update( {id:2}, { $set: {"name":"hussein","age":30} } );

# URI encoding to encode the password if it is containing a special caracter befor trying to connect to MongoDB

https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_encodeuricomponent
