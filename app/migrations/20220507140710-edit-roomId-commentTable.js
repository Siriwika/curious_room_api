'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("Comments", "roomId", {
        allowNull: false,
        type: Sequelize.INTEGER,
          references: {
            model: "Rooms",
            key: "id",
            as: "comment_room",
          },
      }
    )]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Comments', 'roomId', {
        allowNull: false,
        type: Sequelize.INTEGER,
      }),
    ]);
  }
};
