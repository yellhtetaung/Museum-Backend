const { Router } = require("express");
const route = Router();
const db = require("../database");

route.get("/", async (req, res) => {
  const { email, password } = req.query;
  if (email && password) {
    db.query(
      `SELECT * FROM user_info WHERE email='${email}' AND password='${password}'`,
      (error, results) => {
        if (error) throw error;
        if (results[0]) {
          res.status(200).send(results[0]);
        } else res.status(404).send({ msg: `You don't have account` });
      }
    );
  } else {
    res.status(404).sendStatus(404);
  }
});

route.post("/signup", (req, res) => {
  const { username, email, password } = req.body;
  if (email && password && username) {
    db.query(`SELECT * FROM user_info`, (error, results) => {
      if (error) throw error;
      const resultEmail = results.find((result) => result.email === email);
      const resultUsername = results.find(
        (result) => result.username === username
      );
      if (resultEmail) {
        res.status(403).send({ email: "Email is already created." });
      } else if (resultUsername) {
        res.status(403).send({ username: "Username is already used." });
      } else {
        db.query(
          `INSERT INTO user_info (username, email, password) VALUES ('${username}', '${email}', '${password}')`,
          (error, results) => {
            if (error) throw error;
            res.status(201).send({ msg: "Created Account" });
          }
        );
      }
    });
  } else res.status(403).sendStatus(403);
});

module.exports = route;
