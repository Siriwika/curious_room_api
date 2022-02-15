"use strict";

module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('Posts', 'upVote', {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      }),
      queryInterface.addColumn('Posts', 'downVote', {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      }),
       queryInterface.addColumn('Posts', 'countVote', {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      })
    ]);
  },

  down: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Posts', 'upVote'),
      queryInterface.removeColumn('Posts', 'downVote'),
      queryInterface.removeColumn('Posts', 'countVote')
    ]);
  }
};