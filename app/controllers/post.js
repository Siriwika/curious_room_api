const model = require("../models");
const Post = model.Post;
const PostHistory = model.PostHistory;
const User = model.User;
const Vote = model.Vote;
const sequelize = require("sequelize");
// const { QueryTypes } = require("sequelize");

module.exports = {
  createPost: async (req, res) => {
    const img = req.file
      ? req.file.path.replace(/\\/g, "/").replace("public", "static")
      : null;
    const url = "http://147.182.209.40/";
    if (req.body.userId != null) {
      const data = await Post.create({
        userId: req.body.userId,
        roomId: req.body.roomId,
      });
      let post;
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
    const check = req.params.filter;
    let data;
    if (check == "true") {
      data = await Post.findAll({
        where: { roomId: req.params.roomid, statusPost: "ACTIVE" },
        order: [["countVote", "DESC"],["id", "DESC"]],
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
        raw: true,
        nest: true,
      });
    } else {
      data = await Post.findAll({
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
        raw: true,
        nest: true,
      });
    }
    let listVote = [];
    if (data) {
      let listId = [];
      for (let i = 0; i < data.length; i++) {
        listId.push(data[i].id);
      }
      console.log(listId);
      for (let i = 0; i < listId.length; i++) {
        const myEachVote = await Vote.findAll({
          where: { postId: listId[i], userId: req.params.userid },
          raw: true,
          nest: true,
        });
        if (myEachVote) {
          let status;
          if (myEachVote[0] == null) {
            status = "none";
          } else {
            status = myEachVote[0].voteStatus;
          }
          listVote.push(status);
        } else {
          listVote.push(2);
        }
      }
      if (listVote[0] != 2) {
        data.push({ listVoteStatus: listVote });
        res.status(200).json(data);
      } else {
        res.status(500).send({
          message: `Cannot get status`,
        });
      }
    } else {
      res.status(500).send({
        message: `Cannot get post`,
      });
    }
  },

  editPost: async (req, res) => {
    if (req.body.postId != null) {
      const editData = await PostHistory.findOne({
        where: { postId: req.body.postId, status: 1 },
      });
      editData.status = 0;
      const picture = req.file
        ? req.file.path.replace(/\\/g, "/").replace("public", "static")
        : null;
      const url = "http://147.182.209.40/";
      let post;
      if (picture) {
        post = await PostHistory.create({
          content: req.body.content,
          image: url + picture,
          postId: req.body.postId,
        });
      } else {
        post = await PostHistory.create({
          content: req.body.content,
          postId: req.body.postId,
        });
      }
      if (post) {
        const data = await editData.save();
        if (data) {
          res.status(200).send({
            message: `Edit success`,
          });
        } else {
          res.status(500).send({
            message: `Cannot edit post`,
          });
        }
      }
      res.status(500).send({
        message: `Cannot edit post`,
      });
    } else {
      res.status(500).send({
        message: `Cannot edit post`,
      });
    }
  },

  deletePost: async (req, res) => {
    const deleteData = await Post.findOne({
      where: { id: req.params.postid },
    });
    deleteData.statusPost = "DELETE";
    const data = await deleteData.save();
    if (data) {
      res.status(200).send({
        message: `Delete success`,
      });
    } else {
      res.status(500).send({
        message: `Cannot delete post`,
      });
    }
  },

  getPostHistory: async (req, res) => {
    const postHis = await PostHistory.findAll({
      where: { postId: req.params.postid },
      order: [["id", "DESC"]],
      raw: true,
      nest: true,
    });
    if (postHis) {
      res.status(200).json(postHis);
    } else {
      res.status(500).send({
        message: `Not found Post history`,
      });
    }
  },

  getFilter: async (req, res) => {
    const check = req.body.filter;
    let data;
    if (check) {
      data = await Post.findAll({
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
        raw: true,
        nest: true,
      });
    } else {
      data = await Post.findAll({
        where: { roomId: req.params.roomid, statusPost: "ACTIVE" },
        order: [["countVote", "DESC"]],
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
        raw: true,
        nest: true,
      });
    }
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(500).send({
        message: `Cannot get post`,
      });
    }
  },
};
