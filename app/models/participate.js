'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Participate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Participate.belongsTo(models.User, {
        onDelete: "CASCADE",
        foreignKey: "userId",
        as:"user_participate",
      })
      Participate.belongsTo(models.Room, {
        onDelete: "CASCADE",
        foreignKey: "roomId",
        as:"room_participate",
      })
    }
  };
  Participate.init({
    joinStatus: DataTypes.BOOLEAN,
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
  }, {
    sequelize,
    modelName: 'Participate',
  });
  return Participate;
};