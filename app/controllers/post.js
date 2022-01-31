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
    const postInfo = await Post.findAll({
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
    if (postInfo[0] != null) {
      let listId = [];
      let score = [];
      for(let i =0; i < postInfo.length;i++){
        listId.push(postInfo[i].id);
      }
      console.log(listId);
      for (let i = 0; i < listId.length; i++) {
        const allRow = await Vote.findAll({
          attributes: [
            [
              sequelize.fn("count", sequelize.col("postId")),
              "countAllRow",
            ],
          ],
          where: { postId: listId[i], voteStatus: 1 },
          raw: true,
          nest: true,
        });
  
        const downVote = await Vote.findAll({
          attributes: [
            [
              sequelize.fn("count", sequelize.col("postId")),
              "allDownVote",
            ],
          ],
          where: { postId: listId[i], voteStatus: 0 },
          raw: true,
          nest: true,
        });
        // score.push(allRow[0].countAllRow - downVote[0].allDownVote);
        if (allRow && downVote) {
          score.push(allRow[0].countAllRow - downVote[0].allDownVote);
        } else {
           score.push(2);
        }
      }
      if(score[0] != 2){
        let i = {"score" : score};
        postInfo.push(i);
        res.status(200).json(postInfo);
      }else {
        res.status(500).send({
          message: `Cannot get post`,
        });
      }
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
      if (picture) {
        const post = await PostHistory.create({
          content: req.body.content,
          image: url + picture,
          postId: req.body.postId,
        });
      } else {
        const post = await PostHistory.create({
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
};
