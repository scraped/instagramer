const {DataTypes} = require('sequelize');
let Client = require('instagram-private-api').V1;

function init(instance) {
  const Account = instance.define('Account', {
    id: {
      field: 'AccountID',
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true,
      validate: {
        notEmpty: true,
      },
    },
    userId: {
      field: 'UserID',
      type: DataTypes.STRING(100),
      allowNull: true,
      validate: {
        notEmpty: true,
      },
      references: {
        model: 'User',
        key: 'id',
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
    token: {
      field: 'Token',
      type: DataTypes.STRING(300),
      allowNull: true,
      validate: {
        notEmpty: true,
      },
    },
    disabled: {
      field: 'Disabled',
      type: DataTypes.BOOLEAN,
      default: false,
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
    tableName: 'Account',
    createdAt: 'createdOn',
    updatedAt: 'changedOn',
  });


  Account.addHook('beforeCreate', async (account, options) => {
    let device = new Client.Device(account.id);
    let storage = new Client.CookieFileStorage(`${__dirname}./../../../cookies/${account.id}.json`);
    try {
      await Client.Session.create(device, storage, account.id, account.password);
    } catch (e) {
      throw new Error(e);
    }
  });

  return Account;
}

module.exports = init;
