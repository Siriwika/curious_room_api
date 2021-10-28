const { getUser, createUser, UpdateUser } = require("../controllers/users");

const {
  createRoom,
  getMyRoom,
  getRoomByCode,
  updateRoom,
  deleteRoom,
} = require("../controllers/rooms");

const {
  getParticipate,
  getRoomParticipate,
  joinRoom,
  deleteParticipate,
} = require("../controllers/participates");

const {createPost} = require("../controllers/post");

const { uploadImg } = require("../middlewares/multer");



module.exports = function (app) {
  app.post("/user/:email", getUser);
  app.post("/user", createUser);
  app.put("/user/:id", uploadImg.single("display"), UpdateUser);

  app.post("/room", createRoom);
  app.get("/room/user/:userid", getMyRoom);
  app.get("/room/:code", getRoomByCode);
  app.put("/room/:roomid", updateRoom);
  app.put("/room/delete/:roomid", deleteRoom);

  app.get("/participate/:roomid", getParticipate);
  app.get("/participate/room/:id", getRoomParticipate);
  app.post("/participate", joinRoom);
  app.put("/participate/:roomid", deleteParticipate);

  app.post("/post", uploadImg.single("image"), createPost);
};
