const { test } = require("../controllers/users");

const controller = ("../controllers/users");

module.exports = function (app) {

    app.get("/user", test);
}