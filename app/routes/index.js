const { getUser, createUser, UpdateUser , getStatistic } = require("../controllers/users");

const {
  createRoom,
  getMyRoom,
  getRoomByCode,
  updateRoom,
  deleteRoom,
  getAllRooms,
  getHighestPost,
} = require("../controllers/rooms");

const {
  getParticipate,
  getRoomParticipate,
  joinRoom,
  deleteParticipate,
} = require("../controllers/participates");

const {createPost, getPost,editPost,deletePost, getPostHistory} = require("../controllers/post");

const { uploadImg } = require("../middlewares/multer");

const { createComment, getComment, editComment, deleteComment, getCommentHistory } = require("../controllers/comment");



module.exports = function (app) {
  app.get("/user/:email", getUser);
  app.post("/user", createUser);
  app.put("/user/:id", uploadImg.single("display"), UpdateUser);
  app.post("/user/stat/all", getStatistic);

  app.post("/room", createRoom);
  app.get("/room/user/:userid", getMyRoom);
  app.get("/room/:code", getRoomByCode);
  app.put("/room/:roomid", updateRoom);
  app.put("/room/delete/:roomid", deleteRoom);
  app.get("/room", getAllRooms)
  app.get("/room/stat/:roomid",getHighestPost);

  app.get("/participate/:roomid", getParticipate);
  app.get("/participate/room/:id", getRoomParticipate);
  app.post("/participate", joinRoom);
  app.put("/participate/:roomid", deleteParticipate);

  app.post("/post", uploadImg.single("image"), createPost);
  app.get("/post/:roomid", getPost);
  app.put("/post/edit", uploadImg.single("image"), editPost);
  app.put("/post/delete/:postid", deletePost);
  app.get("/post/history/:postid", getPostHistory);

  app.post("/comment", createComment);
  app.get("/comment/:postId", getComment);
  app.put("/comment/edit", editComment);
  app.put("/comment/delete/:commentId", deleteComment);
  app.get("/comment/history/:commentId", getCommentHistory);
};
