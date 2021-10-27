const model = require("../models");
const Room = model.Room;
const User = model.User;

module.exports = {
  //Create room
  createRoom: async (req, res) => {
    genCode = Math.random().toString(26).substring(2, 9);
    console.log(genCode);
    room = req.body.room;
    data = await Room.create({
      name: room.name,
      code: genCode,
      userId: room.userId,
    });
    value = await Room.findOne({
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
    code = req.params.code;
    room = await Room.findOne({
      where: { code: code, statusRoom : 'ACTIVE' },
    });
    if(room){
      value = await Room.findAll({
        where: {id: room.id},
        include:[
          {
            model: User,
            require: true,
            as: "user_room",
          },
        ]
      });
    }
    if (room) {
      res.status(200).json(value);
    } else {
      // res.status(500).send({
      //   message: `Cannot find Room`,
      // });
      res.status(500).json(room);
    }
  },

  getMyRoom: async (req, res) => {
    userid = req.params.userid;
    room = await Room.findAll({
      where: { userId: userid, statusRoom : 'ACTIVE' },
    })
    if(room){
      res.status(200).json(room);
    }
    else {
      res.status(200).json(null);
    }
  }
};
