const model = require("../models");
const User = model.User;
const Post = model.Post;
const Comment = model.Comment;
const Vote = model.Vote;

module.exports = {
  // uploadImg,
  //Get user by email
  getUser: async (req, res) => {
    const email = req.params.email;
    const user = await User.findOne({
      where: { email: email },
    });
    if (user) {
      res.json(user);
    } else {
      res.status(500).send({
        message: `Not found user`,
      });
    }
  },

  //Create user
  createUser: async (req, res) => {
    const data = await User.create({
      name: req.body.name,
      email: req.body.email,
      display: req.body.display,
    });
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(500).send({
        message: `Cannot register`,
      });
    }
  },

  //update user
  UpdateUser: async (req, res) => {
    const id = req.params.id;
    const user = await User.findOne({
      where: { id: id },
    });
    if (req.body.name) {
      user.name = req.body.name;
    } else if (req.file != null) {
      const image = req.file.path
        ? req.file.path.replace(/\\/g, "/").replace("public", "static")
        : "";
      const url = "http://147.182.209.40/";
      user.display = url + image;
    } else {
      res.status(500).send({
        message: `Cannot update user`,
      });
    }
    const data = await user.save();
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(500).send({
        message: `Cannot update user`,
      });
    }
  },

  getStatistic: async (req, res) => {
    const id = req.body.id;
    const role = req.body.role;
    const post = await User.findAndCountAll({
      where: { id: id },
      include: [
        {
          model: Post,
          where: { statusPost: "Active" },
          as: "user_post",
          required: true,
        },
      ],
    });
    const comment = await User.findAndCountAll({
      where: { id: id },
      include: [
        {
          model: Comment,
          where: { statusComment: "Active" },
          as: "user_comment",
          required: true,
        },
      ],
    });
    const con = await User.findAndCountAll({
      where: { id: id },
      include: [
        {
          model: Comment,
          where: { statusComment: "Active" , confirmStatus: 1},
          as: "user_comment",
          required: true,
        },
      ],
    });
    const vote = await User.findAndCountAll({
      where: { id: id },
      include: [
        {
          model: Post,
          where: { statusPost: "Active" },
          as: "user_post",
          include: [{ model: Vote, where: { voteStatus: 1 }, as: "post_vote" }],
        },
      ],
    });
    if (post) {
      if (role == "USER") {
        res.status(200).json({
          user_post: post.count,
          user_comment: comment.count,
          best_comment: con.count,
          user_vote: vote.count,
        });
      } else {
        res.status(200).json({
          user_post: post.count,
        });
      }
    } else {
      res.status(500).send({
        message: `Cannot get statistic user`,
      });
    }
  },
};
