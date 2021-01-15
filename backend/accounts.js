const connection = require("./database");
const validate = require("./validation");
const moment = require('moment');
const express = require("express");

router = express.Router();

module.exports = router;

router.post("/accounts", (request, response) => {

  if (validate.is_blank(request.body.user_id)) {
    response.status(400).send("Error! User id is blank.");
  } else if (validate.is_blank(request.body.name)) {
    response.status(400).send("Error! Name is blank.");
  } else if (validate.is_blank(request.body.balance)) {
    response.status(400).send("Error! Balance is blank.");
  } else {
    const date = new Date();
    const formatedDate = moment(date).format('YYYY-MM-DD');
    connection.query(
      `insert into accounts (user_id, name, balance, date_created) values ('${request.body.user_id}','${request.body.name}','${request.body.balance}','${formatedDate}')`,
      (errors, results) => {
        if (errors) {
          console.log(errors);
          response.status(500).send("Error ocurred while querying");
        } else {
          response.send({ message: "Account saved successfully", insertId: results.insertId });
        }
      }
    );
  }
});

router.get("/accounts/all", (request, response) => {
  connection.query(`select * from accounts`, (errors, results) => {
    if (errors) {
      console.log(errors);
      response.status(500).send("Error ocurred while querying");
    } else {
      response.send(results);
    }
  });
});

router.get("/accounts/account_id", (request, response) => {
  if (validate.is_blank(request.query.account_id)) {
    response.status(400).send("Error! Account id is blank");
  } else {
    connection.query(
      `select * from accounts where account_id = ${request.query.account_id}`,
      (errors, results) => {
        if (errors) {
          console.log(errors);
          response.status(500).send("Error ocurred while querying");
        } else {
          response.send(results);
        }
      }
    );
  }
});

router.get("/accounts/user_id", (request, response) => {
  if (validate.is_blank(request.query.user_id)) {
    response.status(400).send("Error! User id is blank");
  } else {
    connection.query(
      `select * from accounts where user_id = ${request.query.user_id}`,
      (errors, results) => {
        if (errors) {
          console.log(errors);
          response.status(500).send("Error ocurred while querying");
        } else {
          response.send(results);
        }
      }
    );
  }
});


router.put("/accounts", (request, response) => {
  console.log(request.body);
  if (validate.is_blank(request.body.account_id)) {
    response.status(400).send("Error! Account id is blank.");
  } else if (validate.is_blank(request.body.name)) {
    response.status(400).send("Error! Name is blank.");
  } else if (validate.is_blank(request.body.balance)) {
    response.status(400).send("Error! balance is blank.");
  } else {
    connection.query(
      `update accounts set name = '${request.body.name}', balance = ${request.body.balance}  where account_id = '${request.body.account_id}'`,
      (errors, results) => {
        if (errors) {
          console.log(errors);
          response.status(500).send("Error ocurred while querying");
        } else {
          response.send("Account updated successfully");
        }
      }
    );
  }
});



router.delete("/accounts/account_id", (request, response) => {
  console.log(request.query)
  if (validate.is_blank(request.query.account_id)) {
    response.status(400).send("Error! Account id is blank");
  } else {
    connection.query(
      `delete from accounts where account_id = '${request.query.account_id}'`,
      (errors, results) => {
        if (errors) {
          console.log(errors);
          response.status(500).send("Error ocurred while querying");
        } else {
          response.send("Account deleted successfully");
        }
      }
    );
  }
});
