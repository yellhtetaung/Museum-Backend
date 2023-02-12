const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Yellhtet@2488",
  database: "museum_pool",
  port: 3306,
});

connection.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to databases");
});

module.exports = connection;
