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
};
