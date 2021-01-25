const express = require("express");
const main = require("./routes/main");
const diagnosa = require("./routes/diagnosa");

const { callDB } = require("./config/DB");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 5000 || process.env.PORT;

callDB();

app.use("/", main);
app.use("/diagnosa", diagnosa);

app.listen(PORT, console.log("Listening port 5000"));
