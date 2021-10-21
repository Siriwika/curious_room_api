const { getUser, createUser , uploadImg } = require("../controllers/users");
const { createRoom } = require("../controllers/rooms");

module.exports = function (app) {
  app.post("/user/:email", getUser);
  app.post("/user", uploadImg, createUser);

  app.post("/room", createRoom);
};
