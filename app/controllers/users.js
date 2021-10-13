const model = require("../models");
const User = model.User;

module.exports = {
  //Get user by email
  getUser: async (req, res) => {
    email = req.params.email;
    user = await User.findOne({
      where: { email: email },
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).send({
        message: `Cannot find user with email = ${email}`,
      });
    }
  },

  //Create user
  createUser: async (req, res) => {
    user = req.body.user;
    data = await User.create({
      name: user.name,
      email: user.email,
    });
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(500).send({
        message: `Cannot create user`,
      });
    }
  },
};
