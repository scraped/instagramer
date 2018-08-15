const {DataTypes} = require('sequelize');


function init(instance) {
    const Interlocutor = instance.define('Interlocutor', {
        id: {
            field: 'InterlocutorID',
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        login: {
            field: 'Login',
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        accountId: {
            field: 'AccountId',
            type: DataTypes.STRING(100),
            allowNull: true,
            validate: {
                notEmpty: true,
            },
            references: {
                model: 'Account',
                key: 'id',
            },
        },
        lastMessage: {
            field: 'LastMessage',
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        unread: {
            field: 'Unread',
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        status: {
            field: 'Status',
            type: DataTypes.ENUM('favorite', 'pending'),
            allowNull: true,
        },
        createdOn: {
            field: 'CreatedOn',
            type: DataTypes.DATE,
            allowNull: false,
        },
        changedOn: {
            field: 'ChangedOn',
            type: DataTypes.DATE,
            allowNull: false,
        },
    }, {
        timestamps: true,
        freezeTableName: true,
        tableName: 'Interlocutor',
        createdAt: 'createdOn',
        updatedAt: 'changedOn',
    });

    return Interlocutor;
}


module.exports = init;
