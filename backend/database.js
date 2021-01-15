const mysql = require("mysql");

parameters = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password", // type your own password here
  database: "nusmoney", // replace with the name of the databse you used on day 1
};

connection = mysql.createConnection(parameters); // define a connection object

connection.connect((errors) => {
  if (errors) {
    console.log(errors);
  } else {
    console.log("MySQL connected successfully");
  }
});

module.exports = connection;