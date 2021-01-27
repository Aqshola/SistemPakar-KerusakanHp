const express = require("express");
const path = require("path");
const Flash = require("./middleware/FlashMessage");

const main = require("./routes/main");
const diagnosa = require("./routes/diagnosa");
const admin = require("./routes/admin");
const auth = require("./routes/auth");

const { callDB } = require("./config/DB");
const bodyParser = require("body-parser");
const session = require("express-session");

const app = express();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "sistempakar",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(Flash);

const PORT = 5000 || process.env.PORT;

callDB();

app.use("/", main);
app.use("/diagnosa", diagnosa);
app.use("/admin", admin);
app.use("/auth", auth);

app.listen(PORT, console.log("Listening port 5000"));
