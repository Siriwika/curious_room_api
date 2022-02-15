const model = require("../models");
const Vote = model.Vote;
const Post = model.Post;
const sequelize = require("sequelize");
const e = require("express");
// const { QueryTypes } = require("sequelize");

module.exports = {
  vote: async (req, res) => {
    const wantTo = req.body.status;
    const postid = req.body.postId;
    const userid = req.body.userId;
    const check = await Vote.findOne({
      where: { postId: postid, userId: userid },
    });
    const score = await Post.findOne({
      where: { id: postid, statusPost: "ACTIVE" },
    });
    let updateScore;
    if (check) {
      check.voteStatus = wantTo;
      const changeVote = await check.save();
      if (score) {
        if (wantTo == 1) {
          score.upVote = score.upVote + 1;
          score.downVote = score.downVote - 1;
          score.countVote = score.countVote + 2;
          updateScore = await score.save();
        } else {
          score.downVote = score.downVote + 1;
          score.upVote = score.upVote - 1;
          score.countVote = score.countVote - 2;
          updateScore = await score.save();
        }
      }
      if (updateScore && changeVote) {
        res.status(200).json(changeVote);
      } else {
        res.status(500).send({
          message: `Cannot change vote`,
        });
      }
    } else {
      const myVote = await Vote.create({
        voteStatus: wantTo,
        userId: userid,
        postId: postid,
        include: [
          {
            model: Post,
            required: true,
            as: "post_vote",
          },
        ],
        raw: true,
        nest: true,
      });
      if (score) {
      if (wantTo == 1) {
        score.upVote = score.upVote + 1;
        score.countVote = score.countVote + 1;
        updateScore = await score.save();
      } else {
        score.downVote = score.downVote + 1;
        score.countVote = score.countVote - 1;
        updateScore = await score.save();
      }
    }
      if (myVote && updateScore) {
        res.status(200).json(myVote);
      } else {
        res.status(500).send({
          message: `Cannot vote`,
        });
      }
    }
  },
};
