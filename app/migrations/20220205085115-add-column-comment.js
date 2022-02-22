"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Comments", "confirmStatus", {
      allowNull: false,
      type: Sequelize.BOOLEAN,
      defaultValue: 0,
    });
  },
  
  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Comments", "confirmStatus", {
      allowNull: false,
      type: Sequelize.BOOLEAN,
      defaultValue: 0,
    });
  },
};
