const model = require("../models");
const Participate = model.Participate;
const User = model.User;
const Room = model.Room;
module.exports = {
  getParticipate: async (req, res) => {
    roomid = req.params.roomid;
    data = await Participate.findAll({
      where: { roomId: roomid },
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

  getRoomParticipate: async (req, res) => {
    id = req.params.id;
    const room = await Participate.findAll({
      where: { userId: id },
      include: [
        {
          model: Room,
          required: true,
          as: "room_participate",
          include:[
            {
              model:User,
              required:true,
              as:'user_room'
            }
          ]
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
