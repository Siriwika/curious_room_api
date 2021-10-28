'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    // logic for transforming into the new state
    return queryInterface.changeColumn(
      'Posts',
     'commentId', {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    );

  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Posts', 'commentId', {
      type: Sequelize.INTEGER,
      allowNull: false
      
  },)
  }
}
