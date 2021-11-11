const { image } = require("faker");
const model = require("../models");
const Post = model.Post;
const PostHistory = model.PostHistory;
const User = model.User;

module.exports = {
  createPost: async (req, res) => {
    console.log(req.file);
    img = req.file
      ? req.file.path.replace(/\\/g, "/").replace("public", "static")
      : null;
    const url = "http://147.182.209.40/";
    if (req.body.userId != null) {
      data = await Post.create({
        userId: req.body.userId,
        roomId: req.body.roomId,
      });
      console.log(data);
      if (img) {
        post = await PostHistory.create({
          content: req.body.content,
          image: url + img,
          postId: data.id,
        });
      } else {
        post = await PostHistory.create({
          content: req.body.content,
          postId: data.id,
        });
      }
      if (post) {
        res.status(200).send({
          message: `Create post success`,
        });
      } else {
        res.status(500).send({
          message: `Cannot create post`,
        });
      }
    } else {
      res.status(500).send({
        message: `Cannot create post`,
      });
    }
  },

  getPost: async (req, res) => {
    console.log(req.params.roomid);
    postInfo = await Post.findAll({
      where: { roomId: req.params.roomid, statusPost: "ACTIVE" },
      order: [["id", "DESC"]],
      include: [
        {
          model: User,
          required: true,
          as: "user_post",
        },
        {
          model: PostHistory,
          where: {
            status: 1,
          },
         
          required: true,
          as: "post_history",
        },
      ],
    });
    if (postInfo) {
      res.status(200).json(postInfo);
    } else if (postInfo[0] == null) {
      res.status(500).send({
        message: `No post`,
      });
    } else {
      res.status(500).send({
        message: `Cannot get post`,
      });
    }
  },
};
