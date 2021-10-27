const { getUser, createUser , UpdateUser} = require("../controllers/users")
const { createRoom, getRoom} = require("../controllers/rooms")
const { getParticipate , getRoomParticipate, joinRoom} = require("../controllers/participates")
const { uploadImg }  = require("../middlewares/multer")

module.exports = function (app) {
  app.post("/user/:email", getUser)
  app.post("/user",  createUser)
  app.put("/user/:id", uploadImg.single("display") , UpdateUser)

  app.post("/room", createRoom)
  app.get("/room/:code", getRoom)
  // app.get("/room/:id", getAboutRoom)
  
  app.post("/participate", joinRoom)
  app.get("/participate/:roomid", getParticipate)
  app.get("/participate/room/:id", getRoomParticipate)
  
};
