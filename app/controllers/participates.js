const model = require("../models");
const Participate = model.Participate;
const User = model.User;
const Room = model.Room;
module.exports = {
  getParticipate: async (req, res) => {
    roomid = req.params.roomid;
    data = await Participate.findAll({
      where: { roomId: roomid, joinStatus: 1 },
      include: [
        {
          model: User,
          required: true,
          as: "user_participate",
        },
      ],
    });
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(500).send({
        message: `Cannot find participates`,
      });
    }
  },

  joinRoom: async (req, res) => {
    joinData = await Participate.create({
      userId: req.body.userId,
      roomId: req.body.roomId
    });
    if(joinData){
      value = await Participate.findAll({
        where: { userId: req.body.userId },
        include:[
          {
            model:User,
            require:true,
            as:"user_participate"
          }
        ]
      })
    }
    if (joinData) {
      res.status(200).json(value);
    } else {
      res.status(500).send({
        message: `Cannot create participates`,
      });
    }
  },

  getRoomParticipate: async (req, res) => {
    id = req.params.id;
    const room = await Participate.findAll({
      where: { userId: id , joinStatus: 1 },
      include: [
        {
          model: Room,
          where: {
            statusRoom : 'ACTIVE'
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
    if (room) {
      res.status(200).json(room);
    } else {
      res.status(500).send({
        message: `Cannot find room Participate`,
      });
    }
  },
};
