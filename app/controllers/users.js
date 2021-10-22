const model = require("../models");
const multer = require("multer");
const User = model.User;

//stroe image
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `files/user-${file.fieldname}-${Date.now()}.${ext}`);
  },
});

const uploadImg = multer({ storage: multerStorage }).single("display");

module.exports = {
  uploadImg,
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
    // let file = req.file.path;
    // console.log('req file >>', file);
    data = await User.create({
      name: req.body.name,
      email: req.body.email,
      display: req.body.display,
    });
    if (data) {
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
      user.display = req.file.path;
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
