const {DataTypes} = require('sequelize');


function init(instance) {
    const User = instance.define('User', {
        id: {
            field: 'UserID',
            type: DataTypes.STRING(100),
            allowNull: false,
            primaryKey: true,
            validate: {
                notEmpty: true,
            },
        },
        password: {
            field: 'Password',
            type: DataTypes.STRING(100),
            allowNull: true,
            validate: {
                notEmpty: true,
            },
        },
        role: {
            field: 'Role',
            type: DataTypes.ENUM('admin', 'manager'),
            validate: {
                notEmpty: true,
            },
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
        tableName: 'User',
        createdAt: 'createdOn',
        updatedAt: 'changedOn',
    });

    return User;
}


module.exports = init;
