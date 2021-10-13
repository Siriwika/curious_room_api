"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CommentHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CommentHistory.belongsTo(models.Comment, {
        onDelete: "CASCADE",
        foreignKey: "commentId",
        as: "comment_history",
      });
    }
  }
  CommentHistory.init(
    {
      content: DataTypes.STRING,
      commentId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Comment",
          key: "id",
        },
      },
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "CommentHistory",
    }
  );
  return CommentHistory;
};
