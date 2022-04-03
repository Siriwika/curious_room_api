const model = require("../models");
const Room = model.Room;
const User = model.User;
const Post = model.Post;
const Comment = model.Comment;
const sequelize = require("sequelize");

module.exports = {
  //Create room
  createRoom: async (req, res) => {
    const genCode = Math.random().toString(26).substring(2, 9);
    const room = req.body.room;
    const data = await Room.create({
      name: room.name,
      code: genCode,
      userId: room.userId,
    });
    const value = await Room.findOne({
      where: { id: data.id },
      include: [
        {
          model: User,
          required: true,
          as: "user_room",
        },
      ],
    });
    if (value) {
      res.status(200).json(value);
    } else {
      res.status(500).send({
        message: `Cannot create room`,
      });
    }
  },

  getRoomByCode: async (req, res) => {
    const code = req.params.code;
    const room = await Room.findOne({
      where: { code: code, statusRoom: "ACTIVE" },
    });
    if (room) {
      value = await Room.findAll({
        where: { id: room.id },
        include: [
          {
            model: User,
            require: true,
            as: "user_room",
          },
        ],
      });
    }
    if (room) {
      res.status(200).json(value);
    } else {
      res.status(500).send({
        message: `Cannot find Room`,
      });
      // res.status(500).json(room);
    }
  },

  getMyRoom: async (req, res) => {
    const userid = req.params.userid;
    const room = await Room.findAll({
      where: { userId: userid, statusRoom: "ACTIVE" },
    });
    if (room) {
      res.status(200).json(room);
    } else {
      res.status(500).send({
        message: `Not found your room`,
      });
    }
  },

  updateRoom: async (req, res) => {
    const roomid = req.params.roomid;
    const room = await Room.findOne({
      where: { id: roomid },
    });
    if (req.body.name) {
      room.name = req.body.name;
      const data = await room.save();
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(500).send({
          message: `Cannot update room`,
        });
      }
    } else {
      res.status(500).send({
        message: `Cannot find room`,
      });
    }
  },

  deleteRoom: async (req, res) => {
    const roomid = req.params.roomid;
    const room = await Room.findOne({
      where: { id: roomid },
    });
    if (room) {
      room.statusRoom = "DELETE";
    } else {
      res.status(500).send({
        message: `Cannot find room.`,
      });
    }
    const data = await room.save();
    if (data) {
      res.status(200).send({
        message: `Delete room success.`,
      });
    } else {
      res.status(500).send({
        message: `Cannot Delete room`,
      });
    }
  },

  getAllRooms: async (req, res) => {
    const room = await Room.findAll({
      where: { statusRoom: "ACTIVE" },
      include: [
        {
          model: User,
          required: true,
          as: "user_room",
        },
      ],
    });
    console.log(room);
    if (room) {
      res.json(room);
    } else {
      res.status(500).send({
        message: `Not found room`,
      });
    }
  },

  getHighestPost: async (req, res) => {
    const id = req.params.roomid;
    const statist = await Post.findAll({
      attributes: [
        "userId",
        "roomId",
        [model.sequelize.fn("count", model.sequelize.col("userId")), "statist"],
      ],
      where: { roomId: id, statusPost: "ACTIVE" },
      group: ["Post.userId"],
      order: [[model.sequelize.literal("statist"), "DESC"]],
      include: [
        {
          model: User,
          required: true,
          as: "user_post",
          attributes: ["name", "display"],
        },
      ],
    });
    // console.log(statist);
    if (statist) {
      res.status(200).json(statist);
    } else {
      res.status(500).send({
        message: `Unable to calculate`,
      });
    }
  },

  getHighestAns: async (req, res) => {
    const PostData = await Post.findAll({
      where: { roomId: req.params.roomid, statusPost: "ACTIVE" },
      order: [["id", "DESC"]],
    });
    let listAnsScore = [];
    let finish = [];
    if (PostData) {
      for (let l = 0; l < PostData.length; l++) {
        console.log(PostData[l].id);
        getConfirm = await Comment.findAll({
          where: {
            postId: PostData[l].id,
            statusComment: "ACTIVE",
            confirmStatus: 1,
          },
          attributes: [
            "userId",
            [
              model.sequelize.fn("count", model.sequelize.col("userId")),
              "statist",
            ],
          ],
          group: ["userId"],
          include: [
            {
              model: User,
              required: true,
              as: "user_comment",
              attributes: ["name", "display"],
            },
          ],
          raw: true,
          nest: true,
        });
        if (getConfirm) {
          // getConfirm[0] != null ? listAnsScore.push(getConfirm[0]) : null;
          finish = getConfirm;
        } else {
          listAnsScore.push(0);
        }
      }

      if (listAnsScore[0] != 0) {
        // console.log(finish);
        // finish.push(listAnsScore);
        res.status(200).json(finish);
      } else {
        res.status(500).send({
          message: `Unable to calculate `,
        });
      }
    } else {
      res.status(500).send({
        message: `Unable to calculate `,
      });
    }
  },

  getChartData: async (req, res) => {
    console.log(req.params.roomid);
    const statist = await Post.findAll({
      where: { roomId: req.params.roomid, statusPost: "ACTIVE" },
      attributes: [
        "userId",
        [sequelize.fn("sum", sequelize.col("countVote")), "mostLike"],
      
      ],
      include: [
        {
          model: User,
          required: true,
          as: "user_post",
          attributes: ["name"],
        },
      ],
      group: ["userId"],
      order: [[model.sequelize.literal("mostLike"), "DESC"]],
      raw: true,
      nest: true,
    });
    if (statist) {
      res.status(200).json(statist);
    } else {
      res.status(500).send({
        message: `Unable to calculate`,
      });
    }
  },
};
