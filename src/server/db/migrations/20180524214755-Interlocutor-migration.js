const {DataTypes} = require('sequelize');


function up(queryInterface) {
    return queryInterface.createTable(
        'Interlocutor',
        {
            InterlocutorID: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            AccountID: {
                type: DataTypes.STRING(100),
                allowNull: true,
                references: {
                    model: 'Account',
                    key: 'AccountID',
                },
            },
            CreatedOn: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            ChangedOn: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            Login: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
            LastMessage: {
                type: DataTypes.STRING(30),
                allowNull: true,
            },
            Unread: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            Status: {
                type: DataTypes.ENUM,
                values: ['favorite', 'pending'],
                allowNull: true,
            },
        }
    );
}


function down(queryInterface) {
    return queryInterface.dropTable('Interlocutor');
}


module.exports = {up, down};
