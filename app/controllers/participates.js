// const { values } = require("sequelize/types/lib/operators");
const model = require("../models");
const Participate = model.Participate;
const User = model.User;


module.exports = {
  getParticipate: async (req, res) => {
    id = req.params.id;
    data = await Participate.findAll({
      where: { roomId: id },
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
  }
};
