const Sequelize = require('sequelize');
const config = require('./../../../db.config.json');
const operatorsAliases = require('./operatorsAliases');
const fs = require('fs');
const path = require('path');
const modelDefinitions = require('./models');
const migrate = require('./migrations');


let db;


async function populateData(type) {
    const dirPath = path.resolve(`src/server/db/data/${type}`);
    const data = fs.existsSync(dirPath) && fs.readdirSync(dirPath);

    if (data && data.length) {
        for (const file of data) {
            const modelName = file.replace('.json', '');
            if (db.models[modelName]) {
                const items = require(`${dirPath}/${file}`);
                for (const item of items) {
                    const foundObject = await db.models[modelName].findOne({
                        where: item,
                    });

                    if (!foundObject) {
                        await db.models[modelName].create(item);
                    }
                }
            } else {
                console.warn(
                    `Populating of type ${type} file ${dirPath}/${file} missed: model ${modelName} doesn't exit.`,
                );
            }
        }
    } else {
        console.warn(`Populating of type ${type} missed: directory ${dirPath} is empty.`);
    }
}

async function initialize() {
    const sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        {
            host: config.host,
            dialect: config.dialect,
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000,
            },
            operatorsAliases,
        },
    );


    Object.keys(modelDefinitions).forEach((modelName) => {
        modelDefinitions[modelName](sequelize);
    });

    Object.keys(sequelize.models).forEach((model) => {
        if (sequelize.models[model].associate) {
            sequelize.models[model].associate(sequelize.models);
        }
    });

    db = sequelize;

    await migrate(sequelize);

    // TODO add system population
    populateData('system');
    if (config.population && (config.population !== 'system')) {
        populateData(config.population);
    }
}

initialize();


module.exports = db;
