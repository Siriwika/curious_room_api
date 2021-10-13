"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Vote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Vote.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user_vote",
      });
      Vote.belongsTo(models.Post, {
        foreignKey: "postId",
        as: "post_vote",
      });
    }
  }
  Vote.init(
    {
      voteStatus: DataTypes.BOOLEAN,
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "User",
          key: "id",
        },
      },
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
      modelName: "Vote",
    }
  );
  return Vote;
};
