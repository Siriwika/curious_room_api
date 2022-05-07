"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Room.hasMany(models.Participate, {
        foreignKey: "roomId",
        as: "room_participate",
      });
      Room.hasMany(models.Post, {
        foreignKey: "roomId",
        as: "room_post",
      });
      Room.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user_room",
      });
      Room.hasMany(models.Comment, {
        foreignKey: "roomId",
        as: "comment_room",
      });
    }
  }
  Room.init(
    {
      name: DataTypes.STRING,
      code: DataTypes.STRING,
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "User",
          key: "id",
        },
      },
      statusRoom: DataTypes.ENUM("ACTIVE", "DELETE"),
    },
    {
      sequelize,
      modelName: "Room",
    }
  );
  return Room;
};
