'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Posts', 'commentId');
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Posts', 'commentId');
  }
};
