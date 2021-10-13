"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Comment, {
        foreignKey: "userId",
        as: "user_comment",
      });
      User.hasMany(models.Participate, {
        foreignKey: "userId",
        as: "user_participate",
      });
      User.hasMany(models.Post, {
        foreignKey: "userId",
        as: "user_post",
      });
      User.hasMany(models.Room, {
        foreignKey: "userId",
        as: "user_room",
      });
      User.hasMany(models.Vote, {
        foreignKey: "userId",
        as: "user_vote",
      });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      display: DataTypes.STRING,
      role: DataTypes.ENUM("ADMIN", "USER"),
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
