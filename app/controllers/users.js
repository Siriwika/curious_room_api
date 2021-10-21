const model = require("../models");
const multer = require('multer');
const User = model.User;


//stroe image
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'public');
    },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1]
      cb(null, `files/user-${file.fieldname}-${Date.now()}.${ext}`);
  }
});

const uploadImg = multer({storage: multerStorage}).single('display');

module.exports = {

  uploadImg
  ,
  
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
    let file = req.file.path;
    console.log('req file >>', file);
    data = await User.create({
      name: req.body.name,
      email: req.body.email,
      display: file,
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
