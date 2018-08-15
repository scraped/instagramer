const {DataTypes} = require('sequelize');


function up(queryInterface) {
    return queryInterface.createTable(
        'Account',
        {
            AccountID: {
                type: DataTypes.STRING(100),
                allowNull: false,
                primaryKey: true,
            },
            UserID: {
                type: DataTypes.STRING(100),
                allowNull: true,
                references: {
                    model: 'User',
                    key: 'UserID',
                },
            },
            Password: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
            Token: {
                type: DataTypes.STRING(300),
                allowNull: true,
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
    return queryInterface.dropTable('Account');
}


module.exports = {up, down};
