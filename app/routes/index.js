const { getUser, createUser , UpdateUser , uploadImg } = require("../controllers/users")
const { createRoom} = require("../controllers/rooms")
const { getParticipate} = require("../controllers/participates")
module.exports = function (app) {
  app.post("/user/:email", getUser)
  app.post("/user", uploadImg, createUser)
  app.put("/user/:id", uploadImg, UpdateUser)

  app.post("/room", createRoom)
  // app.get("/room/:id", getAboutRoom)

  app.get("/participate/:id", getParticipate)
};
