const express = require("express");
const app = express();

// Route
const userRoute = require("./routes/users");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users", userRoute);

const PORT = 3000;

app.listen(PORT, () => console.log(`Server is running on ${PORT}.`));
