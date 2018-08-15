const Umzug = require('umzug');
const fs = require('fs');
const path = require('path');


async function migrate(instance) {
    const umzug = new Umzug({
        storage: 'sequelize',
        storageOptions: {
            sequelize: instance,
        },
        migrations: {
            params: [instance.getQueryInterface()],
            path: path.resolve('src/server/db/migrations'),
            pattern: /\-migration.js$/,
        },
    });

    let migrations = fs.readdirSync(path.resolve('src/server/db/migrations'));
    let failed;

    for (const migration of migrations) {
        if (!failed && migration.indexOf('migration') >= 0) {
            try {
                await umzug.execute({
                    migrations: [migration],
                    method: 'up',
                });
            } catch (err) {
                failed = true;
                console.error(err);
                await umzug.execute({
                    migrations: [migration],
                    method: 'down',
                });
            }
        }
    }

    if (failed) {
        console.error('Migrations failed! Server is shutting down!');
        process.exit(0);
    }
}


module.exports = migrate;
