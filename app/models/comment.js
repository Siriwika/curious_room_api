"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsTo(models.Post, {
        onDelete: "CASCADE",
        foreignKey: "postId",
        as: "post_comment",
      });
      Comment.belongsTo(models.User, {
        onDelete: "CASCADE",
        foreignKey: "userId",
        as: "user_comment",
      });
      Comment.hasMany(models.CommentHistory, {
        foreignKey: "commentId",
        as: "comment_history",
      });
    }
  }
  Comment.init(
    {
      postId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Post",
          key: "id",
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "User",
          key: "id",
        },
      },
      statusComment: DataTypes.ENUM("ACTIVE", "DELETE"),
      confirmStatus: DataTypes.BOOLEAN,
    },

    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
