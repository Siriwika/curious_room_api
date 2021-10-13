const model = require("../models");
const Room = model.Room;

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
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(500).send({
        message: `Cannot create room`,
      });
    }
  },
};
