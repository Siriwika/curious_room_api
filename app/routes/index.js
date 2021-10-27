const { getUser, createUser , UpdateUser , uploadImg } = require("../controllers/users")
const { createRoom, getRoom} = require("../controllers/rooms")
const { getParticipate, joinRoom} = require("../controllers/participates")
module.exports = function (app) {
  app.post("/user/:email", getUser)
  app.post("/user", uploadImg, createUser)
  app.put("/user/:id", uploadImg, UpdateUser)

  app.post("/room", createRoom)
  app.get("/room/:code", getRoom)
  // app.get("/room/:id", getAboutRoom)

  app.get("/participate/:id", getParticipate)
  app.post("/participate", joinRoom)
};
