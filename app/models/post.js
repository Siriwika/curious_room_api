'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.hasMany(models.Comment,{
        foreignKey: "postId",
        as:"post_comment",
      })
      Post.belongsTo(models.Comment, {
        onDelete: "CASCADE",
        foreignKey: "commentId",
        as:"best_comment",
      })
      Post.belongsTo(models.User, {
        onDelete: "CASCADE",
        foreignKey: "userId",
        as:"user_post",
      })
      Post.belongsTo(models.Room, {
        onDelete: "CASCADE",
        foreignKey: "roomId",
        as:"room_post",
      })
      Post.hasMany(models.PostHistory,{
        foreignKey: "postId",
        as:"post_history",
      })
      Post.hasMany(models.Vote,{
        foreignKey: "postId",
        as:"post_vote",
      })
    }
  };
  Post.init({
    commentId: {
      type:DataTypes.INTEGER,
      references:{
        model:'Comment',
        key:'id'
      },
    },
    userId: {
      type:DataTypes.INTEGER,
      references:{
        model:'User',
        key:'id'
      },
    },
    roomId: {
      type:DataTypes.INTEGER,
      references:{
        model:'Room',
        key:'id'
      },
    },
    statusPost: DataTypes.ENUM('ACTIVE', 'DELETE')
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};