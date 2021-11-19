const model = require("../models");
const User = model.User;
const Post = model.Post;
const Comment = model.Comment;
const Vote = model.Vote;

module.exports = {
  // uploadImg,
  //Get user by email
  getUser: async (req, res) => {
    email = req.params.email;
    user = await User.findOne({
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
    data = await User.create({
      name: req.body.name,
      email: req.body.email,
      display: req.body.display,
    });
    if (data) {
      console.log(data.display);
      res.status(200).json(data);
    } else {
      res.status(500).send({
        message: `Cannot register`,
      });
    }
  },

  //update user
  UpdateUser: async (req, res) => {
    id = req.params.id;
    user = await User.findOne({
      where: { id: id },
    });
    if (req.body.name) {
      user.name = req.body.name;
    } else if (req.file != null) {
      const image = req.file.path
        ? req.file.path.replace(/\\/g, "/").replace("public", "static")
        : "";
      console.log(req.file.path);
      const url = "http://147.182.209.40/";
      console.log("new path image >> ", url + image);
      user.display = url + image;
    } else {
      res.status(500).send({
        message: `Cannot update user`,
      });
    }
    data = await user.save();
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(500).send({
        message: `Cannot update user`,
      });
    }
  },

  getStatistic: async (req, res) => {
    id = req.params.id;
    post = await User.findAndCountAll({
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
    comment = await User.findAndCountAll({
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
    con = await User.findAndCountAll({
      where : {id : id},
      include: [
        {  model: Comment,
          where: { statusComment: "Active" },
          as: "user_comment",
          required: true, include: [
            {
              model : Post,
              where : { statusPost: 'Active'},
              as : 'best_comment'
            }
          ]}
      ]
    })
    vote = await User.findAndCountAll({
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

    if (id) {
      res
        .status(200)
        .json({
          user_post: post.count,
          user_comment: comment.count,
          best_comment: con.count,
          user_vote: vote.count,
        });
    } else {
      res.status(500).send({
        message: `Cannot get statistic user`,
      });
    }
  },
};
