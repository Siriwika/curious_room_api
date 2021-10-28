const model = require("../models");
const Post = model.Post;
const PostHistory = model.PostHistory;

module.exports = {
  createPost: async (req, res) => {
    const image = req.file.path ? (req.file.path).replace(/\\/g, "/").replace("public", "static") : "" ;
    const url = "http://147.182.209.40/";
    data = await Post.create({
      userId: req.body.userId,
      roomId: req.body.roomId,
    });
    console.log(data);
    if (data.id != null) {
       post = await PostHistory.create({
        content: req.body.content,
        image: url+image,
        postId: data.id
      });
      if (post) {
        res.status(200).send({
          message: `Create post success`,
        });
      }else {
        res.status(500).send({
          message: `Cannot create post`,
        });
      }
    }else{
      res.status(500).send({
        message: `Cannot create post`,
      });
    }
  },
};
