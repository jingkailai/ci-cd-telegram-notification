const connection = require("./database");
const validate = require("./validation");
const moment = require('moment');
const express = require("express");

router = express.Router();

module.exports = router;
const transactionTypes = ["Expense", "Income"]

router.post("/transactions", (request, response) => {
  console.log(request.body);
  if (validate.is_blank(request.body.account_id)) {
    response.status(400).send("Error! Account id is blank.");
  } else if (validate.is_blank(request.body.transaction_type)) {
    response.status(400).send("Error! Transaction type is blank.");
  } else if (!transactionTypes.includes(request.body.transaction_type)) {
    response.status(400).send("Error! Transaction type can only be Expense or Income.");
  } else if (validate.is_blank(request.body.transaction_amount)) {
    response.status(400).send("Error! Transaction amount is blank.");
  } else {
    const date = new Date();
    const formatedDate = moment(date).format('YYYY-MM-DD');
    connection.query(
      `insert into transactions (account_id, transaction_type, transaction_amount, transaction_date) values ('${request.body.account_id}','${request.body.transaction_type}','${request.body.transaction_amount}', '${formatedDate}')`,
      (errors, results) => {
        if (errors) {
          console.log(errors);
          response.status(500).send("Error ocurred while querying");
        } else {
          console.log(results);
          response.send({ message: "Transaction saved successfully", insertId: results.insertId });
        }
      }
    );
  }
});

router.get("/transactions/all", (request, response) => {
  connection.query(`select * from transactions`, (errors, results) => {
    if (errors) {
      console.log(errors);
      response.status(500).send("Error ocurred while querying");
    } else {
      response.send(results);
    }
  });
});

router.get("/transactions/account_id", (request, response) => {
  if (validate.is_blank(request.query.account_id)) {
    response.status(400).send("Error! Account id is blank");
  } else {
    connection.query(
      `select * from transactions where account_id = ${request.query.account_id}`,
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

router.get("/transactions/user_id", (request, response) => {
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
          let queryPart = "";
          for (var account of results) {
            if (!queryPart) {
              queryPart = queryPart + account.account_id;
            } else {
              queryPart = queryPart + " , " + account.account_id;
            }
          }
          connection.query(
            `select * from transactions where account_id IN ( ${queryPart} )`,
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
      }
    );
  }
});


router.put("/transactions", (request, response) => {
  console.log(request.body);
  if (validate.is_blank(request.body.transaction_id)) {
    response.status(400).send("Error! Transaction id is blank.");
  } else if (validate.is_blank(request.body.account_id)) {
    response.status(400).send("Error! Account Id is blank.");
  } else if (validate.is_blank(request.body.transaction_amount)) {
    response.status(400).send("Error! transaction_amount is blank.");
  } else if (validate.is_blank(request.body.transaction_type)) {
    response.status(400).send("Error! transaction_amount is blank.");
  } else if (!transactionTypes.includes(request.body.transaction_type)) {
    response.status(400).send("Error! Transaction type can only be Expense or Income.");
  } else {
    connection.query(
      `update transactions set account_id = '${request.body.account_id}', transaction_type = '${request.body.transaction_type}', transaction_amount = ${request.body.transaction_amount}  where transaction_id = '${request.body.transaction_id}'`,
      (errors, results) => {
        if (errors) {
          console.log(errors);
          response.status(500).send("Error ocurred while querying");
        } else {
          response.send("Transaction updated successfully");
        }
      }
    );
  }
});

router.delete("/transactions/id", (request, response) => {
  console.log(request.query);
  if (validate.is_blank(request.query.id)) {
    response.status(400).send("Error! Id is blank");
  } else {
    connection.query(
      `delete from transactions where transaction_id = '${request.query.id}'`,
      (errors, results) => {
        if (errors) {
          console.log(errors);
          response.status(500).send("Error ocurred while querying");
        } else {
          response.send("Transaction deleted successfully");
        }
      }
    );
  }
});
