const connection = require("./database");
const validate = require("./validation");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require('./config');
const moment = require('moment');


const express = require("express");

router = express.Router();

module.exports = router;

router.post("/users", (request, response) => {
  console.log(request.body);
  if (validate.is_blank(request.body.name)) {
    response.status(400).send("Error! Name is blank.");
  } else if (validate.is_blank(request.body.password)) {
    response.status(400).send("Error! Password is blank.");
  } else if (validate.is_blank(request.body.dob)) {
    response.status(400).send("Error! DOB is blank.");
  } else if (validate.is_blank(request.body.email)) {
    response.status(400).send("Error! Email is blank.");
  } else {
    
    const dob = moment(request.body.dob).format('YYYY-MM-DD');
    connection.query(
      `insert into users (name, password, dob, email) values ('${request.body.name}','${request.body.password}','${dob}', '${request.body.email}')`,
      (errors, results) => {
        if (errors) {
          console.log(errors);
          response.status(500).send("Error ocurred while querying");
        } else {
          response.send("User saved successfully");
        }
      }
    );
  }
});


router.get("/users/all", (request, response) => {
  connection.query(`select * from users`, (errors, results) => {
    if (errors) {
      console.log(errors);
      response.status(500).send("Error ocurred while querying");
    } else {
      response.send(results);
    }
  });
});


router.get("/users/user_id", (request, response) => {
  if (validate.is_blank(request.query.user_id)) {
    response.status(400).send("Error! user_id is blank");
  } else {
    connection.query(
      `select * from users where user_id = ${request.query.user_id}`,
      (errors, results) => {
        if (errors) {
          console.log(errors);
          response.status(500).send("Error ocurred while querying");
        } else {
          console.log(results);
          response.status(200).json(results);
        }
      }
    );
  }
});



router.put("/users/password", (request, response) => {
  if (validate.is_blank(request.body.user_id)) {
    response.status(400).send("Error! User id is blank.");
  } else if (validate.is_blank(request.body.password)) {
    response.status(400).send("Error! Password is blank.");
  } else {
    connection.query(
      `update users set password = '${request.body.password}' where user_id = '${request.body.user_id}'`,
      (errors, results) => {
        if (errors) {
          console.log(errors);
          response.status(500).send("Error ocurred while querying");
        } else {
          response.send("User updated successfully");
        }
      }
    );
  }
});

router.put("/users/dob", (request, response) => {
  if (validate.is_blank(request.body.user_id)) {
    response.status(400).send("Error! User id is blank.");
  } else if (validate.is_blank(request.body.dob)) {
    response.status(400).send("Error! DOB is blank.");
  } else {
    const dob = moment(request.body.dob).format('YYYY-MM-DD');
    connection.query(
      `update users set dob = '${dob}' where user_id = '${request.body.user_id}'`,
      (errors, results) => {
        if (errors) {
          console.log(errors);
          response.status(500).send("Error ocurred while querying");
        } else {
          response.send("User updated successfully");
        }
      }
    );
  }
});
router.put("/users/name", (request, response) => {
  if (validate.is_blank(request.body.user_id)) {
    response.status(400).send("Error! User id is blank.");
  } else if (validate.is_blank(request.body.name)) {
    response.status(400).send("Error! Name is blank.");
  } else {
    connection.query(
      `update users set name = '${request.body.name}' where user_id = '${request.body.user_id}'`,
      (errors, results) => {
        if (errors) {
          console.log(errors);
          response.status(500).send("Error ocurred while querying");
        } else {
          response.send("User updated successfully");
        }
      }
    );
  }
});

router.put("/users/email", (request, response) => {
  if (validate.is_blank(request.body.user_id)) {
    response.status(400).send("Error! User ID is blank.");
  } else if (validate.is_blank(request.body.email)) {
    response.status(400).send("Error! Email is blank.");
  } else {
    connection.query(
      `update users set email = '${request.body.email}' where user_id = '${request.body.user_id}'`,
      (errors, results) => {
        if (errors) {
          console.log(errors);
          response.status(500).send("Error ocurred while querying");
        } else {
          response.send("User updated successfully");
        }
      }
    );
  }
});

router.delete("/users/user_id", (request, response) => {
  if (validate.is_blank(request.query.user_id)) {
    response.status(400).send("Error! User id is blank");
  } else {
    connection.query(
      `delete from users where user_id = '${request.query.user_id}'`,
      (errors, results) => {
        if (errors) {
          console.log(errors);
          response.status(500).send("Error ocurred while querying");
        } else {
          response.send("User deleted successfully");
        }
      }
    );
  }
});



router.post("/users/login", (request, response) => {
  console.log("login body", request.body);
  if (validate.is_blank(request.body.email)) {
    response.status(400).send("Error! email is blank");
  }
  else if (validate.is_blank(request.body.password)) {
    response.status(400).send("Error! email is blank");
  } else {
    connection.query(
      `select * from users where email = '${request.body.email}' AND password = '${request.body.password}'`,
      (errors, results) => {
        if (errors) {
          console.log(errors);
          response.status(500).json({ message: "Error ocurred while querying" });
        } else {
          if (results.length) {
            const user = results[0];
            const today = new Date();
            const expirationDate = new Date(today);
            expirationDate.setDate(today.getDate() + 60);

            let payload = {
              user_id: user.user_id,
              name: user.name,
              email: user.email,
              dob: user.dob
            };

            const token = jwt.sign(payload, jwtSecret, {
              expiresIn: parseInt(expirationDate.getTime() / 1000, 10),
            });
            return response.status(200).json({ token, user: payload });
          } else {
            return response.status(401).json({ message: "Unauthorized User!" });
          }
        }
      }
    );
  }
});

router.get('/users/verify-token', (request, response) => {
  const { authorization } = request.headers;

  const token = authorization ? authorization.split(" ")[1] : false;
  // const token = req.headers.authorization.split(' ')[1];
  if (!token)
    return response.status(401).send({ auth: false, message: "No token provided." });
  jwt.verify(token, jwtSecret, function (err, decoded) {
    if (err) {
      console.log(err);
      return response.status(401).send({ auth: false, message: "Failed to authenticate token." });
    }
    response.status(200).send(decoded);
  });
})