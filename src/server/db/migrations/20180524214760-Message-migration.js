const {DataTypes} = require('sequelize');


function up(queryInterface) {
    return queryInterface.createTable(
        'Message',
        {
            MessageID: {
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
            InterlocutorID: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'Interlocutor',
                    key: 'InterlocutorID',
                },
            },
            Text: {
                type: DataTypes.STRING(300),
                allowNull: true,
            },
            Sender: {
                type: DataTypes.ENUM,
                values: ['account', 'interlocutor'],
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
    return queryInterface.dropTable('Message');
}


module.exports = {up, down};
