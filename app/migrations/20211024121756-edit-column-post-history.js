'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Votes', 'voteStatus', {
      allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: 1
  },)
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Votes', 'voteStatus', {
      allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: 0
  },)
  }
};
