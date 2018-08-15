const epilogue = require('epilogue');
const db = require('./../db');


function index(app, controller) {
    epilogue.initialize({
        app: app,
        base: '/api',
        sequelize: db,
    });

    // Generating epilogue API for each model
    Object.keys(db.models).forEach((modelName) => {
        if (modelName !== 'SequelizeMeta') {
            const path = `${modelName[0].toLowerCase() + modelName.substring(1)}s`;
            epilogue.resource({
                model: db.models[modelName],
                endpoints: [`/${path}`, `/${path}/:id`],
            });
        }
    });
}


module.exports.index = index;
