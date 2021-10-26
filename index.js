const express = require("express");
const cors = require("cors");
const path = require("path")
const logger = require("morgan");
const app = express();

app.use(logger("dev"));
app.use(cors());


app.use('/static', express.static(path.join(__dirname, "./public")));

app.use(express.json());
app.use(
  express.urlencoded({ limit: "100mb", extended: true, parameterLimit: 100000 })
);
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true }));

require("./app/routes")(app);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
