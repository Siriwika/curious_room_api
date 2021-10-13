"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PostHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PostHistory.belongsTo(models.Post, {
        onDelete: "CASCADE",
        foreignKey: "postId",
        as: "post_history",
      });
    }
  }
  PostHistory.init(
    {
      content: DataTypes.STRING,
      image: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      postId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Post",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "PostHistory",
    }
  );
  return PostHistory;
};
