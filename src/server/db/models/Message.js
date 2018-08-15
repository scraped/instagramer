const {DataTypes} = require('sequelize');
let Client = require('instagram-private-api').V1;

function init(instance) {
    const Message = instance.define('Message', {
        id: {
            field: 'MessageID',
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
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
        interlocutorId: {
            field: 'InterlocutorId',
            type: DataTypes.STRING(100),
            allowNull: true,
            validate: {
                notEmpty: true,
            },
            references: {
                model: 'Interlocutor',
                key: 'id',
            },
        },
        text: {
            field: 'Text',
            type: DataTypes.STRING(300),
            allowNull: true,
            validate: {
                notEmpty: true,
            },
        },
        sender: {
            field: 'Sender',
            type: DataTypes.ENUM('account', 'interlocutor'),
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
        tableName: 'Message',
        createdAt: 'createdOn',
        updatedAt: 'changedOn',
    });

    Message.addHook('beforeCreate', async (message, options) => {
        if (message.sender === 'account') {
            let device = new Client.Device(message.accountId);
            let storage = new Client.CookieFileStorage(`${__dirname}./../../../cookies/${message.accountId}.json`);
            try {
                await storage.getAccountId();
            } catch (e) {
              
                let account = await instance.models.Account.find(
                  {where: {
                      id: message.accountId,
                  }}
                );
                await Client.Session.create(device, storage, message.accountId, account.password);
            }
            await instance.models.Account.update(
                {unread: 0},
                {where: {
                    id: message.accountId,
                }}
            );

            let interlocutor = await instance.models.Interlocutor.find(
                {where: {
                    id: message.interlocutorId,
                }}
            );
            try {
                let session = await new Client.Session(device, storage);
                let account = await Client.Account.searchForUser(session, interlocutor.login);
                await Client.Thread.configureText(session, account.id, message.text);
            } catch (e) {
                throw new Error('DISABLED');
                console.log(e);
            }
        }
    });

    return Message;
}


module.exports = init;
