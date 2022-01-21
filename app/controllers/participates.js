const model = require("../models");
const Participate = model.Participate;
const User = model.User;
const Room = model.Room;
module.exports = {
  getParticipate: async (req, res) => {
    const roomid = req.params.roomid;
    const data = await Participate.findAll({
      where: { roomId: roomid, joinStatus: 1 },
      include: [
        {
          model: User,
          required: true,
          as: "user_participate",
        },
      ],
    });
    if (data[0] == null) {
      res.status(500).send({
        message: `is not participates`,
      });
    } else if (data) {
      res.status(200).json(data);
    } else {
      res.status(500).send({
        message: `Cannot find participates`,
      });
    }
  },

  joinRoom: async (req, res) => {
    const lookingData = await Participate.findOne({
      where: {
        userId: req.body.userId,
        roomId: req.body.roomId,
      },
    });
    console.log(lookingData);
    if (lookingData) {
      if (lookingData.joinStatus == false) {
        const updateStatus = await Participate.update(
          {
            joinStatus: true,
          },
          {
            where: {
              userId: req.body.userId,
              roomId: req.body.roomId,
            },
          }
        );
        res.status(201).json(updateStatus);
      } else {
        res.status(200).json(lookingData);
      }
    } else {
      if (lookingData == null) {
        res.status(500).send({
          message: `Cannot create participates`,
        });
      }
      const joinData = await Participate.create({
        userId: req.body.userId,
        roomId: req.body.roomId,
      });
      if (joinData) {
        const value = await Participate.findAll({
          where: { userId: req.body.userId },
          include: [
            {
              model: User,
              require: true,
              as: "user_participate",
            },
          ],
        });
        if (value) {
          res.status(201).json(value);
        } else {
          res.status(500).send({
            message: `Cannot create participates`,
          });
        }
      }
      res.status(500).send({
        message: `Cannot create participates`,
      });
    }
  },

  getRoomParticipate: async (req, res) => {
    const id = req.params.id;
    const room = await Participate.findAll({
      where: { userId: id, joinStatus: 1 },
      include: [
        {
          model: Room,
          where: {
            statusRoom: "ACTIVE",
          },
          required: true,
          as: "room_participate",
          include: [
            {
              model: User,
              required: true,
              as: "user_room",
            },
          ],
        },
      ],
    });
    if (room[0] != null) {
      res.status(200).json(room);
    } else {
      res.status(500).send({
        message: `Cannot find room participate`,
      });
    }
  },

  deleteParticipate: async (req, res) => {
    roomid = req.params.roomid;
    participate = await Participate.findOne({
      where: { userId: req.body.userid, roomId: roomid },
    });
    if (participate) {
      if (req.body.userid) {
        participate.joinStatus = 0;
      } else {
        res.status(500).send({
          message: `Cannot find participate.`,
        });
      }
      data = await participate.save();
      if (data) {
        res.status(200).send({
          message: `Delete participate success.`,
        });
      } else {
        res.status(500).send({
          message: `Cannot Delete participate`,
        });
      }
    } else {
      res.status(500).send({
        message: `Cannot Delete participate`,
      });
    }
  },
};
