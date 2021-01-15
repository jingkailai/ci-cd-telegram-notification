const body_parser = require("body-parser");
const express = require("express");
const cors = require('cors');
const users_router = require("./users");
const transactions_router = require("./transactions");
const accounts_router = require("./accounts");

let application = express();
application.use(cors());
application.use(body_parser.json());
application.use(body_parser.urlencoded({ extended: true }));

application.use(users_router);
application.use(transactions_router);
application.use(accounts_router);

application.listen(4000, (errors) => {
  if (errors) {
    console.log(errors);
  } else {
    console.log("Application started on Port 4000!");
  }
});
