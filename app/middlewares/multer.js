const multer = require("multer");

const multerStorage =
  multer.diskStorage({
    destination: function (req, file, cb) {
      let path_name;
      switch (file.fieldname) {
        case "display":
          path_name = "image/users";
          break;
        case "image":
          path_name = "image/posts";
          break;
      }

      cb(null, `./public/${path_name}`);
    },
    filename(req, file, cb) {
      const split = file.originalname.split(".").length;
      const fileType = file.originalname.split(".")[split - 1];
      let newImage = `${Date.now()}.${fileType}`;

      switch (file.fieldname) {
        case 'display':
          newImage = `user-${Date.now()}.${fileType}`;
          break;
      case 'image' :
          newImage = `posts-${Date.now()}.${fileType}`;
          break;
        }
        cb(null, newImage);
    },
  });

  const uploadImg =  multer({ storage : multerStorage});

  module.exports = {
    uploadImg
  };