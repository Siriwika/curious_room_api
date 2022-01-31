const model = require("../models");
const Vote = model.Vote;
const Post = model.Post;
const sequelize = require("sequelize");
// const { QueryTypes } = require("sequelize");

module.exports = {
  vote: async (req, res) => {
    const wantTo = req.body.status;
    const postid = req.body.postId;
    const userid = req.body.userId;
    const check = await Vote.findOne({
      where: { postId: postid, userId: userid },
    });
    console.log(check);
    if (check) {
      check.voteStatus = wantTo;
      const changeVote = await check.save();
      if (changeVote) {
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
      });
      if (myVote) {
        res.status(200).json(myVote);
      } else {
        res.status(500).send({
          message: `Cannot vote`,
        });
      }
    }
  },

  myVote: async (req, res) => {
    const postInfo = await Post.findAll({
      where: { roomId: req.body.roomId, statusPost: "ACTIVE" },
      order: [["id", "DESC"]],
      raw: true,
      nest: true,
    });
    let listVote = [];
    if (postInfo[0] ) {
      let listId = [];
      for (let i = 0; i < postInfo.length; i++) {
        listId.push(postInfo[i].id);
      }
      for (let i = 0; i < listId.length; i++) {
        const myEachVote = await Vote.findAll({
          where: { postId: listId[i], userId: req.body.userId },
          raw: true,
          nest: true,
        });
        if (myEachVote) {
          // console.log(myEachVote[0].voteStatus);
          let status;
          if (myEachVote[0] == null) {
            status = null;
          } else {
            status = myEachVote[0].voteStatus;
          }
          listVote.push(status);
        } else {
          listVote.push(2);
        }
      }
      if (listId != [] && listId[0] != 2) {
        res.status(200).send({ listVoteStatus: listVote });
      } else {
        res.status(500).send({
          message: `Cannot get status`,
        });
      }
    }
     else 
    if (postInfo[0] == null) {
      res.status(200).send({
        listVoteStatus: listVote
      });
    } 
    else {
      res.status(500).send({
        message: `Cannot get status`,
      });
    }
  },
};
