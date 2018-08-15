const {DataTypes} = require('sequelize');

module.exports = {
  up: function (queryInterface) {
    queryInterface.addColumn(
      'Account',
      'Disabled',
      DataTypes.BOOLEAN
    );
  },

  down: function (queryInterface) {
    queryInterface.removeColumn(
      'Account',
      'Disabled'
    );
  },
};
