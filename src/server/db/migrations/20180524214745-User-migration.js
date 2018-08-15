const {DataTypes} = require('sequelize');


function up(queryInterface) {
    return queryInterface.createTable(
        'User',
        {
            UserID: {
                type: DataTypes.STRING(100),
                allowNull: false,
                primaryKey: true,
            },
            Password: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
            Role: {
                type: DataTypes.ENUM,
                values: ['admin', 'manager'],
            },
            CreatedOn: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            ChangedOn: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        }
    );
}


function down(queryInterface) {
    return queryInterface.dropTable('User');
}


module.exports = {up, down};
