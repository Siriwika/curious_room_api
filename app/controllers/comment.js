const model = require("../models");
const Comment = model.Comment;
const CommentHistory = model.CommentHistory;
const User = model.User;

module.exports = {
  createComment: async (req, res) => {
    const data = await Comment.create({
      postId: req.body.postId,
      userId: req.body.userId,
    });
    if (data) {
      const comment = await CommentHistory.create({
        content: req.body.content,
        commentId: data.id,
      });
      if (comment) {
        res.status(200).send({
          comment,
        });
      } else {
        res.status(500).send({
          message: `Cannot create comment`,
        });
      }
    } else {
      res.status(500).send({
        message: `Cannot create comment`,
      });
    }
  },

  getComment: async (req, res) => {
    const commentInfo = await Comment.findAll({
      where: { postId: req.params.postId, statusComment: "ACTIVE" },
      order: [["id", "ASC"]],
      include: [
        {
          model: User,
          required: true,
          as: "user_comment",
        },
        {
          model: CommentHistory,
          where: {
            status: 1,
          },
          required: true,
          as: "comment_history",
        },
      ],
    });
    if (commentInfo[0] != null) {
      res.status(200).json(commentInfo);
    } else if (commentInfo[0] == null) {
      res.status(500).send({
        message: `No comment`,
      });
    } else {
      res.status(500).send({
        message: `Cannot get comment`,
      });
    }
  },
  editComment: async (req, res) => {
    const editData = await CommentHistory.findOne({
      where: { commentId: req.body.commentId, status: 1 },
    });
    editData.status = 0;
    const comment = await CommentHistory.create({
      content: req.body.content,
      commentId: req.body.commentId,
    });
    if (comment) {
      const data = await editData.save();
      if (data) {
        res.status(200).send({
          message: `Edit comment success`,
        });
      } else {
        res.status(500).send({
          message: `Cannot edit comment`,
        });
      }
    } else {
      res.status(500).send({
        message: `Cannot edit comment`,
      });
    }
  },
  deleteComment: async (req, res) => {
    const deleteData = await Comment.findOne({
      where: { id: req.params.commentId },
    });
    deleteData.statusComment = "DELETE";
    const data = await deleteData.save();
    if (data) {
      res.status(200).send({
        message: `Delete comment success`,
      });
    } else {
      res.status(500).send({
        message: `Cannot delete comment`,
      });
    }
  },
  getCommentHistory: async (req, res) => {
    const commentHis = await CommentHistory.findAll({
      where: { commentId: req.params.commentId },
      order: [["id", "DESC"]],
    });
    if (commentHis) {
      res.json(commentHis);
    } else {
      res.status(500).send({
        message: `Not found Comment history`,
      });
    }
  },
  confirmComment: async (req, res) => {
    const confirm = await Comment.findOne({
      where: { id: req.params.commentId },
    });
    confirm.confirmStatus = 1;
    const data = await confirm.save();
    if (data) {
      res.status(200).send({
        message: `Confirm comment success`,
      });
    } else {
      res.status(500).send({
        message: `Cannot confirm comment`,
      });
    }
  },
  updateConfirm: async (req, res) => {
    const editData = await Comment.findOne({
      where: { postId: req.body.postId, confirmStatus: 1 },
    });
    if (editData) {
      editData.confirmStatus = 0;
      await editData.save();
    }
    const confirm = await Comment.findOne({
      where: { id: req.body.commentId },
    });
    confirm.confirmStatus = 1;
    const data2 = await confirm.save();
    if (data2) {
      res.status(200).send({
        message: `Confirm comment success`,
      });
    } else {
      res.status(500).send({
        message: `Cannot confirm comment`,
      });
    }
  },
};
