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
      res.status(500).send({
        message: `Cannot found user`,
      });
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
    id = req.params.id;
    user = await User.findOne({
      where: { id: id },
    });
    if (req.body.name) {
      user.name = req.body.name;
    } else if (req.file.path) {
      const image = req.file.path ? (req.file.path).replace(/\\/g, "/").replace("public", "static") : "" ;
      console.log(req.file.path);
      const url = "http://147.182.209.40/";
      console.log("new path omage >> ",url+image);
      user.display = url+image;
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
