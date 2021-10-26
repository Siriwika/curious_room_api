const { image } = require("faker");
const model = require("../models");
const User = model.User;

module.exports = {

  // uploadImg,
  //Get user by email
  getUser: async (req, res) => {
    email = req.params.email;
    user = await User.findOne({
      where: { email: email },
    });
    if (user) {
      res.json(user);
    } else {
      res.status(500).json(user);
    }
  },

  //Create user
  createUser: async (req, res) => {
    data = await User.create({
      name: req.body.name,
      email: req.body.email,
      display: req.body.display,
    });
    if (data) {
      console.log(data.display);
      res.status(200).json(data);
    } else {
      res.status(500).send({
        message: `Cannot create user`,
      });
    }
  },

  //update user
  UpdateUser: async (req, res) => {
    const image = req.file.path ? (req.file.path).replace(/\\/g, "/").replace("public", "static") : "" ;
    console.log("new path omage >> ",image);
    id = req.params.id;
    user = await User.findOne({
      where: { id: id },
    });
    if (req.body.name) {
      user.name = req.body.name;
    } else if (req.file.path) {
      user.display = image;
    }
    data = await user.save();
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(500).send({
        message: `Cannot update user`,
      });
    }
  },
};
